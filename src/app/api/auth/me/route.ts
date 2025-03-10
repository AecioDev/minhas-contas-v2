import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/server/services/auth";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userData = verifyToken(token);
  if (!userData) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json(userData);
}
