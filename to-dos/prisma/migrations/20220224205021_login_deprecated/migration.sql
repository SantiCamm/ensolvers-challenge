/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_creatorId_fkey";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "creatorId";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "creatorId";
