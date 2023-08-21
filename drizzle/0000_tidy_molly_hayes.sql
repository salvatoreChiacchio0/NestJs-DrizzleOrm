DO $$ BEGIN
 CREATE TYPE "types" AS ENUM('FOOD', 'MATERIAL', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"dayNum" smallint NOT NULL,
	"time" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" smallint,
	"types" "types" NOT NULL,
	"inventory_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"surname" text,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"roles" "roles" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_At" timestamp DEFAULT now() NOT NULL,
	"general" boolean DEFAULT false,
	"other" boolean DEFAULT false,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
