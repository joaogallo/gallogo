import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password, ageGroup } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha sao obrigatorios." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Este email ja esta cadastrado." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        ageGroup: ageGroup || "AGE_8_10",
      },
    });

    // Create initial points record
    await prisma.userPoints.create({
      data: {
        userId: user.id,
        totalPoints: 0,
        level: 1,
        streak: 0,
      },
    });

    return NextResponse.json(
      { id: user.id, message: "Conta criada com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar conta." },
      { status: 500 }
    );
  }
}
