-- verify: ack DM-18 staging-only table, known empty at deploy time
ALTER TABLE "users" ADD COLUMN "company" TEXT NOT NULL;
