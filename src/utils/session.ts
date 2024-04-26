import { SessionEncodedKey } from "@constants/config";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { isConfig, getConfig } from "@utils/env";

export async function encrypt<T extends {} = { id: string }>(payload: T) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SessionEncodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, SessionEncodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = Number(getConfig("COOKIE_EXPIRE"));
  const expiresAt = new Date(Date.now() + expires);
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: isConfig("COOKIE_HTTP_ONLY"),
    secure: isConfig("COOKIE_SECURE"),
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
