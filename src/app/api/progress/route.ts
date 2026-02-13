import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLevelForPoints } from "@/data/levels";

// GET /api/progress — fetch user stats (points, level, streak, badges)
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [points, badges, progressCount] = await Promise.all([
    prisma.userPoints.findUnique({ where: { userId } }),
    prisma.userBadge.findMany({
      where: { userId },
      select: { badgeId: true, earnedAt: true },
    }),
    prisma.userProgress.count({
      where: { userId, completed: true },
    }),
  ]);

  const totalPoints = points?.totalPoints ?? 0;
  const level = getLevelForPoints(totalPoints);

  return NextResponse.json({
    totalPoints,
    level: level.level,
    levelName: level.namePt,
    streak: points?.streak ?? 0,
    lastActive: points?.lastActive?.toISOString() ?? new Date().toISOString(),
    earnedBadgeIds: badges.map((b) => b.badgeId),
    completedCount: progressCount,
  });
}

// POST /api/progress — record lesson/challenge completion
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();
  const { lessonId, challengeId, code, points: earnedPoints } = body as {
    lessonId: string;
    challengeId?: string;
    code?: string;
    points: number;
  };

  if (!lessonId || typeof earnedPoints !== "number") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Upsert progress record
  const existing = await prisma.userProgress.findUnique({
    where: {
      userId_lessonId_challengeId: {
        userId,
        lessonId,
        challengeId: challengeId ?? "",
      },
    },
  });

  const isFirstCompletion = !existing?.completed;

  await prisma.userProgress.upsert({
    where: {
      userId_lessonId_challengeId: {
        userId,
        lessonId,
        challengeId: challengeId ?? "",
      },
    },
    create: {
      userId,
      lessonId,
      challengeId: challengeId ?? "",
      completed: true,
      score: earnedPoints,
      attempts: 1,
      code: code ?? null,
      completedAt: new Date(),
    },
    update: {
      completed: true,
      score: { increment: isFirstCompletion ? 0 : 0 },
      attempts: { increment: 1 },
      code: code ?? undefined,
      completedAt: new Date(),
    },
  });

  // Only award points on first completion
  let newTotalPoints = 0;
  let newBadges: string[] = [];
  let leveledUp = false;
  let newLevel = 1;
  let newLevelName = "";

  if (isFirstCompletion) {
    // Update streak
    const userPoints = await prisma.userPoints.findUnique({ where: { userId } });
    const now = new Date();
    let newStreak = userPoints?.streak ?? 0;
    const lastActive = userPoints?.lastActive ?? new Date(0);
    const daysSinceActive = Math.floor(
      (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceActive === 1) {
      newStreak += 1;
    } else if (daysSinceActive > 1) {
      newStreak = 1;
    }
    // daysSinceActive === 0 means same day, keep streak

    // Streak bonus
    const streakBonus = daysSinceActive === 1 ? 10 : 0;
    const totalEarned = earnedPoints + streakBonus;

    const oldPoints = userPoints?.totalPoints ?? 0;
    const oldLevel = getLevelForPoints(oldPoints);

    const updated = await prisma.userPoints.upsert({
      where: { userId },
      create: {
        userId,
        totalPoints: totalEarned,
        level: 1,
        streak: 1,
        lastActive: now,
      },
      update: {
        totalPoints: { increment: totalEarned },
        streak: newStreak,
        lastActive: now,
      },
    });

    newTotalPoints = updated.totalPoints;
    const newLevelDef = getLevelForPoints(newTotalPoints);
    newLevel = newLevelDef.level;
    newLevelName = newLevelDef.namePt;

    if (newLevelDef.level > oldLevel.level) {
      leveledUp = true;
      await prisma.userPoints.update({
        where: { userId },
        data: { level: newLevelDef.level },
      });
    }

    // Check for badge awards
    newBadges = await checkAndAwardBadges(userId, {
      lessonId,
      challengeId,
      streak: newStreak,
      totalPoints: newTotalPoints,
    });
  } else {
    const userPoints = await prisma.userPoints.findUnique({ where: { userId } });
    newTotalPoints = userPoints?.totalPoints ?? 0;
    const lvl = getLevelForPoints(newTotalPoints);
    newLevel = lvl.level;
    newLevelName = lvl.namePt;
  }

  return NextResponse.json({
    success: true,
    isFirstCompletion,
    totalPoints: newTotalPoints,
    level: newLevel,
    levelName: newLevelName,
    leveledUp,
    newBadges,
  });
}

async function checkAndAwardBadges(
  userId: string,
  ctx: {
    lessonId: string;
    challengeId?: string;
    streak: number;
    totalPoints: number;
  }
): Promise<string[]> {
  const existingBadges = await prisma.userBadge.findMany({
    where: { userId },
    select: { badgeId: true },
  });
  const earned = new Set(existingBadges.map((b) => b.badgeId));
  const newBadges: string[] = [];

  async function award(badgeId: string) {
    if (earned.has(badgeId)) return;
    await prisma.userBadge.create({ data: { userId, badgeId } });
    newBadges.push(badgeId);
    earned.add(badgeId);
  }

  // First lesson completed
  const completedCount = await prisma.userProgress.count({
    where: { userId, completed: true, challengeId: "" },
  });
  if (completedCount >= 1) await award("first_step");

  // Challenges completed
  const challengesCompleted = await prisma.userProgress.count({
    where: { userId, completed: true, challengeId: { not: "" } },
  });
  if (challengesCompleted >= 20) await award("challenge_hunter");

  // Module 1 completion (lessons 1.1 - 1.7)
  const mod1Lessons = ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7"];
  const mod1Completed = await prisma.userProgress.count({
    where: { userId, completed: true, lessonId: { in: mod1Lessons }, challengeId: "" },
  });
  if (mod1Completed >= mod1Lessons.length) await award("basics_complete");

  // Streak badges
  if (ctx.streak >= 3) await award("streak_3");
  if (ctx.streak >= 7) await award("streak_7");
  if (ctx.streak >= 30) await award("streak_30");

  // Night owl (after midnight)
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) await award("night_owl");

  // Challenge-specific badges from lesson context
  if (ctx.challengeId) {
    if (ctx.challengeId.includes("square") || ctx.lessonId === "1.4")
      await award("square_master");
    if (ctx.challengeId.includes("triangle") || ctx.lessonId === "1.5")
      await award("triangle_master");
    if (ctx.challengeId.includes("circle") || ctx.lessonId === "2.2")
      await award("circle_master");
  }

  // Gallery drawings
  const drawingCount = await prisma.drawing.count({
    where: { userId, isPublic: true },
  });
  if (drawingCount >= 10) await award("digital_artist");

  return newBadges;
}
