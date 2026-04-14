-- Deliberately bad: NOT NULL without DEFAULT on an existing table.
-- This is the cal.com guestCompany shape.
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL
);
