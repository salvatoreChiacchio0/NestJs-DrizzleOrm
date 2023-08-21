import type { Config } from "drizzle-kit";

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString:"postgresql://127.0.0.1/NestJs - DrizzleJs?user=postgres&password=admin"
  }
} satisfies Config;