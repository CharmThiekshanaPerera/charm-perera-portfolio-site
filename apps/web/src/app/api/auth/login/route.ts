import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { AdminUser, connectToDatabase, loginSchema } from "@charm/db";
import { createSessionCookie } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FAILED_ATTEMPTS = 8;
const LOCKOUT_MINUTES = 15;

/** Deliberately vague: never reveal whether an email exists. */
const GENERIC_ERROR = "Invalid email or password.";

export async function POST(request: Request) {
  // Per-IP throttle, on top of the per-account lockout below.
  const limit = rateLimit(clientKey(request.headers, "login"), 10, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 400 });
  }

  const { email, password } = parsed.data;

  try {
    await connectToDatabase();
    const user = await AdminUser.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Spend comparable time to a real verification so response timing does
      // not disclose whether the account exists.
      await bcrypt.compare(password, "$2a$12$invalidsaltinvalidsaltinvalidsaltinvalidsaltuu");
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 401 });
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutes = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
      return NextResponse.json(
        { ok: false, error: `Account locked. Try again in ${minutes} minute(s).` },
        { status: 423 },
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      const failedAttempts = (user.failedAttempts ?? 0) + 1;
      const shouldLock = failedAttempts >= MAX_FAILED_ATTEMPTS;

      await AdminUser.updateOne(
        { _id: user._id },
        {
          $set: {
            failedAttempts: shouldLock ? 0 : failedAttempts,
            lockedUntil: shouldLock
              ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000)
              : null,
          },
        },
      );

      return NextResponse.json(
        {
          ok: false,
          error: shouldLock
            ? `Too many failed attempts. Account locked for ${LOCKOUT_MINUTES} minutes.`
            : GENERIC_ERROR,
        },
        { status: shouldLock ? 423 : 401 },
      );
    }

    await AdminUser.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date(), failedAttempts: 0, lockedUntil: null } },
    );

    await createSessionCookie({
      sub: String(user._id),
      email: user.email,
      name: user.name || "",
      role: user.role || "admin",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[auth] login failed:", error);
    return NextResponse.json(
      { ok: false, error: "Sign-in is unavailable right now. Please try again." },
      { status: 500 },
    );
  }
}
