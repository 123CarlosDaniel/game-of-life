/*
  Warnings:

  - You are about to drop the column `reaction` on the `reaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `creation` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `reaction` DROP COLUMN `reaction`,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
