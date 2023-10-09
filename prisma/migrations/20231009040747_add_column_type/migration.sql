-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SYSTEM', 'USER');

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "type" "NotificationType" DEFAULT 'SYSTEM';
