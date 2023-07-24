-- DropForeignKey
ALTER TABLE "persons" DROP CONSTRAINT "persons_addressId_fkey";

-- AlterTable
ALTER TABLE "persons" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
