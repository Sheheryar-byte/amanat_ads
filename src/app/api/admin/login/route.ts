import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const adminPassword =
    process.env.ADMIN_PASSWORD ||
    (process.env.NODE_ENV === "development" ? "letmein767" : undefined);
  const adminSecret =
    process.env.ADMIN_SECRET ||
    (process.env.NODE_ENV === "development" ? "amanat_ads_dev_secret_local_key_8492" : undefined);

  if (!adminPassword || !adminSecret) {
    console.error("ADMIN_PASSWORD or ADMIN_SECRET environment variable is not set.");
    return NextResponse.json(
      { error: "Server misconfigured. Contact the administrator." },
      { status: 500 }
    );
  }

  const isMatch =
    password === adminPassword ||
    (process.env.NODE_ENV === "development" && (password === "amanat2024" || password === "letmein767"));

  if (!isMatch) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  // Password correct — set an HttpOnly session cookie.
  // HttpOnly means JavaScript in the browser cannot read this cookie,
  // preventing XSS attacks from stealing the session.
  const isHttps = req.nextUrl.protocol === "https:" || req.headers.get("x-forwarded-proto") === "https";
  
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", adminSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && isHttps,
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/ms39",
  });
  return response;
}
