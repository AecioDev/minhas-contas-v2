import { NextResponse } from "next/server";
import { createUser } from "@/server/services/auth";

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const user = await createUser(userData);

    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
