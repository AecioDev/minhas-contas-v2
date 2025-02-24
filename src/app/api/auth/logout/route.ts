import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/server/services/auth";

export async function POST() {
  removeAuthCookie();
  return NextResponse.json({ success: true });
}
