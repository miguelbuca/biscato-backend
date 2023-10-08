/*
  Warnings:

  - Made the column `content` on table `notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "extra" DROP NOT NULL;
