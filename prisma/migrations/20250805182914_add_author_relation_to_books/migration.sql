/*
  Warnings:

  - Added the required column `authorId` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable: First add the column as nullable, then update existing records, then make it required
ALTER TABLE "books" ADD COLUMN "authorId" INTEGER;

-- Update existing books to assign them to the first user (assuming there's at least one user)
UPDATE "books" SET "authorId" = (SELECT id FROM "users" LIMIT 1) WHERE "authorId" IS NULL;

-- Make the column required
ALTER TABLE "books" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
