import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminPassword || !adminSecret) {
    console.error("ADMIN_PASSWORD or ADMIN_SECRET environment variable is not set.");
    return NextResponse.json(
      { error: "Server misconfigured. Contact the administrator." },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  // Password correct — set an HttpOnly session cookie.
  // HttpOnly means JavaScript in the browser cannot read this cookie,
  // preventing XSS attacks from stealing the session.
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", adminSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/ms39",
  });
  return response;
}
