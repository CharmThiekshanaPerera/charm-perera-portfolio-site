import mongoose from "mongoose";

/**
 * Serverless-safe Mongoose connection.
 *
 * Vercel keeps a warm Node process alive between invocations but re-evaluates
 * modules on cold starts, so the connection promise is cached on `globalThis`
 * to avoid opening a new pool (and exhausting Atlas connection limits) on every
 * request.
 */
declare global {
  // eslint-disable-next-line no-var
  var __charmMongoose:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

const cached = globalThis.__charmMongoose ?? { conn: null, promise: null };
globalThis.__charmMongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and add your Atlas connection string.",
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || "charm_portfolio",
      bufferCommands: false,
      // Keep the pool small: serverless spawns many short-lived instances and
      // Atlas M0 caps concurrent connections at 500.
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}
