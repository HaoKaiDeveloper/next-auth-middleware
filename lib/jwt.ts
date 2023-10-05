import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import type { tokenType, userType } from "@/types";

export async function sign(val: tokenType, secret: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60;

  return new SignJWT({ ...val })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string) {
  const { payload }: { payload: JWTPayload | userType } = await jwtVerify(
    token,
    new TextEncoder().encode(secret)
  );
  return payload.name ? payload : null;
}
