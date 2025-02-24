import { NextResponse } from "next/server";
import {
  validateUser,
  generateToken,
  setAuthCookie,
} from "@/server/services/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await validateUser(email, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken(user);
    setAuthCookie(token);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
