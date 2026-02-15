import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLevelForPoints } from "@/data/levels";

// GET /api/leaderboard?ageGroup=AGE_8_10
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ageGroup = req.nextUrl.searchParams.get("ageGroup");

  const where = ageGroup
    ? { user: { ageGroup: ageGroup as "AGE_6_8" | "AGE_8_10" | "AGE_10_14" } }
    : {};

  const entries = await prisma.userPoints.findMany({
    where,
    orderBy: { totalPoints: "desc" },
    take: 50,
    include: {
      user: {
        select: { id: true, name: true, image: true, ageGroup: true },
      },
    },
  });

  const leaderboard = entries.map((entry, index) => {
    const levelDef = getLevelForPoints(entry.totalPoints);
    return {
      rank: index + 1,
      userId: entry.user.id,
      name: entry.user.name || "Anonimo",
      image: entry.user.image,
      ageGroup: entry.user.ageGroup,
      totalPoints: entry.totalPoints,
      level: levelDef.level,
      levelName: levelDef.namePt,
      levelIcon: levelDef.icon,
      streak: entry.streak,
      isCurrentUser: entry.user.id === session.user.id,
    };
  });

  // If current user is not in top 50, add them
  const currentInList = leaderboard.find((e) => e.isCurrentUser);
  let currentUserRank = null;

  if (!currentInList) {
    const userPoints = await prisma.userPoints.findUnique({
      where: { userId: session.user.id },
      include: {
        user: { select: { id: true, name: true, image: true, ageGroup: true } },
      },
    });

    if (userPoints) {
      const rank = await prisma.userPoints.count({
        where: { totalPoints: { gt: userPoints.totalPoints } },
      });
      const levelDef = getLevelForPoints(userPoints.totalPoints);
      currentUserRank = {
        rank: rank + 1,
        userId: userPoints.user.id,
        name: userPoints.user.name || "Anonimo",
        image: userPoints.user.image,
        ageGroup: userPoints.user.ageGroup,
        totalPoints: userPoints.totalPoints,
        level: levelDef.level,
        levelName: levelDef.namePt,
        levelIcon: levelDef.icon,
        streak: userPoints.streak,
        isCurrentUser: true,
      };
    }
  }

  return NextResponse.json({ leaderboard, currentUserRank });
}
