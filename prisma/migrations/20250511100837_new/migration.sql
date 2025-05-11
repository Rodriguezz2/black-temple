-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "provider" TEXT,
    "providerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" SERIAL NOT NULL,
    "spec" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "title" TEXT,
    "patch" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverviewDifficulty" (
    "id" SERIAL NOT NULL,
    "spec" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "singleTarget" INTEGER NOT NULL,
    "multiTarget" INTEGER NOT NULL,
    "utility" INTEGER NOT NULL,
    "survivability" INTEGER NOT NULL,
    "mobility" INTEGER NOT NULL,
    "guideId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OverviewDifficulty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroTalents" (
    "id" SERIAL NOT NULL,
    "guideId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroTalents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tab" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "iconUrl" TEXT,
    "content" TEXT NOT NULL,
    "heroTalentsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OverviewDifficulty_guideId_key" ON "OverviewDifficulty"("guideId");

-- CreateIndex
CREATE UNIQUE INDEX "HeroTalents_guideId_key" ON "HeroTalents"("guideId");

-- CreateIndex
CREATE INDEX "Tab_value_idx" ON "Tab"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Tab_value_heroTalentsId_key" ON "Tab"("value", "heroTalentsId");

-- AddForeignKey
ALTER TABLE "OverviewDifficulty" ADD CONSTRAINT "OverviewDifficulty_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroTalents" ADD CONSTRAINT "HeroTalents_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tab" ADD CONSTRAINT "Tab_heroTalentsId_fkey" FOREIGN KEY ("heroTalentsId") REFERENCES "HeroTalents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
