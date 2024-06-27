/*
  Warnings:

  - You are about to drop the `_categorytophoto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytophoto` DROP FOREIGN KEY `_CategoryToPhoto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytophoto` DROP FOREIGN KEY `_CategoryToPhoto_B_fkey`;

-- AlterTable
ALTER TABLE `photos` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_categorytophoto`;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
