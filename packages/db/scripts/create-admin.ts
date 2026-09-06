/**
 * Creates (or updates the password of) an admin user for /admin.
 *
 *   npm run create-admin -- you@example.com '<strong password>'
 *   npm run create-admin -- you@example.com          # generates a password
 *
 * Positional arguments are used because npm claims `--email` and `--password`
 * as its own config flags and strips them before the script ever sees them.
 * `--admin-email` / `--admin-password` and the ADMIN_EMAIL / ADMIN_PASSWORD
 * environment variables also work.
 *
 * If no password is supplied a strong one is generated and printed once. The
 * plaintext is never written to the database — only a bcrypt hash is stored.
 */
import { config as loadEnv } from "dotenv";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import path from "node:path";
import process from "node:process";

loadEnv({ path: path.resolve(process.cwd(), "../../.env.local") });
loadEnv({ path: path.resolve(process.cwd(), "../../.env") });
loadEnv({ path: path.resolve(process.cwd(), "../../apps/web/.env.local") });

import { connectToDatabase, disconnectFromDatabase } from "../src/connect";
import { AdminUser } from "../src/models";

/** Supports both `--name value` and `--name=value`. */
function readFlag(name: string): string | undefined {
  const args = process.argv.slice(2);

  const index = args.indexOf(`--${name}`);
  if (index !== -1 && args[index + 1] && !args[index + 1]!.startsWith("--")) {
    return args[index + 1];
  }

  const inline = args.find((arg) => arg.startsWith(`--${name}=`));
  return inline ? inline.slice(name.length + 3) : undefined;
}

/** Bare arguments, in order, ignoring anything flag-shaped. */
function positionals(): string[] {
  const args = process.argv.slice(2);
  const result: string[] = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]!;
    if (arg.startsWith("--")) {
      // Skip the value that belongs to a `--flag value` pair.
      if (!arg.includes("=") && args[i + 1] && !args[i + 1]!.startsWith("--")) i += 1;
      continue;
    }
    result.push(arg);
  }

  return result;
}

function generatePassword(): string {
  // 24 URL-safe characters ≈ 143 bits of entropy.
  return crypto.randomBytes(18).toString("base64url");
}

async function main() {
  const [positionalEmail, positionalPassword] = positionals();

  const email = (
    positionalEmail ||
    readFlag("admin-email") ||
    readFlag("email") ||
    process.env.ADMIN_EMAIL ||
    ""
  )
    .trim()
    .toLowerCase();

  const name =
    readFlag("admin-name") || readFlag("name") || process.env.ADMIN_NAME || "Site admin";

  let password =
    positionalPassword ||
    readFlag("admin-password") ||
    readFlag("password") ||
    process.env.ADMIN_PASSWORD ||
    "";

  let generated = false;

  if (!email) {
    console.error(
      "\n Missing email address.\n" +
        "   npm run create-admin -- you@example.com '<strong password>'\n" +
        "   npm run create-admin -- you@example.com        (generates a password)\n",
    );
    process.exit(1);
  }

  if (!password) {
    password = generatePassword();
    generated = true;
  }

  if (password.length < 12) {
    console.error("\n Password must be at least 12 characters.\n");
    process.exit(1);
  }

  await connectToDatabase();

  // Cost 12 keeps verification around ~250ms — slow enough to blunt offline
  // cracking, fast enough for an interactive login.
  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await AdminUser.findOne({ email }).lean();

  await AdminUser.updateOne(
    { email },
    {
      $set: {
        email,
        name,
        passwordHash,
        role: "admin",
        failedAttempts: 0,
        lockedUntil: null,
      },
    },
    { upsert: true },
  );

  console.log(`\n Admin ${existing ? "password updated" : "created"}: ${email}`);
  if (generated) {
    console.log("\n Generated password (shown once — store it in a password manager):\n");
    console.log(`   ${password}\n`);
  }
  console.log(" Sign in at /admin/login\n");

  await disconnectFromDatabase();
}

main().catch(async (error) => {
  console.error("\n Failed:", error instanceof Error ? error.message : error);
  await disconnectFromDatabase().catch(() => {});
  process.exit(1);
});
