-- ADD COLUMN NOT NULL without DEFAULT — DM-18 should fire.
ALTER TABLE "users" ADD COLUMN "company" TEXT NOT NULL;
