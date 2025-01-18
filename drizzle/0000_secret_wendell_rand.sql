CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"rating" integer DEFAULT 0,
	"about" text NOT NULL,
	"quantity" integer NOT NULL,
	"available" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"mobile_number" varchar(15),
	"email" varchar(256) NOT NULL,
	"usertype" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "mobile_number_idx" ON "users" USING btree ("mobile_number");