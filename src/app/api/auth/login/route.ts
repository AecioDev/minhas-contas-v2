import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 401 }
      );
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Gera o token JWT
    const token = sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Configura o cookie de autenticação
    // const response = NextResponse.json({
    //   message: "Login realizado com sucesso",
    // });

    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    response.cookies.set("token", token, {
      httpOnly: true, // Protege contra XSS
      secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
      sameSite: "strict",
      path: "/", // Disponível em todas as páginas
      maxAge: 60 * 60 * 24, // Expira em 1 dia
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import {
//   validateUser,
//   generateToken,
//   setAuthCookie,
// } from "@/server/services/auth";

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     const user = await validateUser(email, password);
//     if (!user) {
//       return NextResponse.json(
//         { error: "Email ou Senha inválidos!" },
//         { status: 401 }
//       );
//     }

//     const token = generateToken(user);
//     setAuthCookie(token);

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
