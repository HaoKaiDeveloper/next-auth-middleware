import { NextResponse, NextRequest } from "next/server";
import { verify } from "@/lib/jwt";
import { userType } from "@/types";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/api/login")) {
    console.log(req.nextUrl.pathname);
  }

  if (pathname.startsWith("/secret")) {
    const token = req.cookies.get("token")?.value as string;
    try {
      const user = (await verify(token, "jwtsecret")) as userType | null;
      if (!user) {
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 401 }
        );
      }
      const reqHeaders = new Headers(req.headers);
      reqHeaders.set("x-user-email", user.email);
      reqHeaders.set("x-user-name", encodeURIComponent(user.name));

      return NextResponse.next({
        request: {
          headers: reqHeaders,
        },
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 401 }
      );
    }
  }
}
