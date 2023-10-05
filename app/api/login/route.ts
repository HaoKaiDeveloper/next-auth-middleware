import { NextResponse } from "next/server";
import { sign } from "@/lib/jwt";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60;

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email } = body;
  if (!name || !email) {
    return NextResponse.json({ msg: "failed" });
  }

  const token = await sign({ name, email }, "jwtsecret");

  const seralized = serialize("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: MAX_AGE,
    path: "/",
  });

  return NextResponse.json(
    { msg: "login" },
    {
      status: 200,
      headers: { "Set-Cookie": seralized },
    }
  );
}
