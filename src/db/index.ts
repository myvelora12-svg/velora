import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres";
if (!process.env.DATABASE_URL && process.env.NODE_ENV === "production" && typeof window === "undefined" && !process.env.NEXT_RUNTIME) {
  // Hanya beri peringatan saat build jika env belum di-set
  console.warn("Peringatan: DATABASE_URL belum di-set di environment.");
}

// pooler Supabase (?pgbouncer=true) untuk serverless — gunakan singleton di dev mode
declare global {
  // eslint-disable-next-line no-var
  var __postgres_client: ReturnType<typeof postgres> | undefined;
}

const client =
  globalThis.__postgres_client ??
  postgres(url, {
    max: process.env.NODE_ENV === "production" ? 5 : 2,
    idle_timeout: 10,
    connect_timeout: process.env.DATABASE_URL ? 10 : 1,
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__postgres_client = client;
}

export const db = drizzle(client, { schema });
