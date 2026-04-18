CREATE TYPE "public"."payment_status" AS ENUM('canceled', 'created', 'done', 'expired', 'payed', 'refund_pending', 'refund_rejected', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."service" AS ENUM('signature_30', 'signature_75', 'signature_100', 'premier', 'jet_setter', 'executive_elite', 'daily_access', 'request_access');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"account_id" varchar(255) NOT NULL,
	"provider_id" varchar(255) NOT NULL,
	"admin_id" varchar(255) NOT NULL,
	"access_token" varchar(255),
	"refresh_token" varchar(255),
	"id_token" varchar(255),
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" varchar(255),
	"password" varchar(255),
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(150) NOT NULL,
	"image" varchar(255),
	"is_email_verified" boolean NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"amount" numeric,
	"currency" varchar NOT NULL,
	"experiences" text[] NOT NULL,
	"service" "service" NOT NULL,
	"paymentId" varchar,
	"payment_status" "payment_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"admin_id" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"ip_address" varchar(255),
	"user_agent" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"date_of_birth" date NOT NULL,
	"email" varchar(150) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"telegram" varchar(32) NOT NULL,
	"notes" text,
	"street" varchar(100),
	"city" varchar(85),
	"country" varchar(56),
	"postcode" varchar(20),
	"experiences" text[] NOT NULL,
	"service" "service" NOT NULL,
	"is_service_active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_telegram_unique" UNIQUE("telegram")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"identifier" varchar(255) NOT NULL,
	"value" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;