import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Simple mock authentication: accept any non-empty username and password
  if (username && password) {
    return NextResponse.json({ success: true, username });
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }
}
