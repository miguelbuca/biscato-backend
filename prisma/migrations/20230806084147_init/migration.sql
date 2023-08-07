-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('React', 'Comment');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('ACTIVE', 'INACTIVE', 'AWAY', 'AVAILABLE', 'BUSY', 'OFFLINE', 'ONLINE', 'ON_HOLD', 'IN_PROGRESS', 'COMPLETED', 'PENDING', 'PAUSED', 'UNDECIDED', 'IN_PROCESS', 'UNDER_REVIEW', 'CANCELED', 'BLOCKED', 'RELEASED', 'UNDER_MAINTENANCE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "phoneNumber" TEXT,
    "avatar" TEXT,
    "nif" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skillTpes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "svgXml" TEXT,
    "background" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "skillTpes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "skillTypeId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "works" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "title" TEXT NOT NULL,
    "costPerHour" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "totalTime" INTEGER NOT NULL,
    "time" "WorkType" NOT NULL,
    "term" TEXT,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER,
    "skillTypeId" INTEGER NOT NULL,

    CONSTRAINT "works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "workId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interactions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "type" "InteractionType" NOT NULL,
    "workId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "workId" INTEGER NOT NULL,
    "hiredId" INTEGER NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "workId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusType" DEFAULT 'ACTIVE',
    "fromAccount" INTEGER NOT NULL,
    "toAccount" INTEGER NOT NULL,
    "content" TEXT,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "persons_addressId_key" ON "persons"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "works_addressId_key" ON "works"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_workId_key" ON "ratings"("workId");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_workId_key" ON "contracts"("workId");

-- CreateIndex
CREATE UNIQUE INDEX "applications_workId_key" ON "applications"("workId");

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_skillTypeId_fkey" FOREIGN KEY ("skillTypeId") REFERENCES "skillTpes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_skillTypeId_fkey" FOREIGN KEY ("skillTypeId") REFERENCES "skillTpes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interactions" ADD CONSTRAINT "interactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_hiredId_fkey" FOREIGN KEY ("hiredId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_fromAccount_fkey" FOREIGN KEY ("fromAccount") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_toAccount_fkey" FOREIGN KEY ("toAccount") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
