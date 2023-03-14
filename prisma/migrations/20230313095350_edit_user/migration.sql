/*
  Warnings:

  - You are about to alter the column `pushStart` on the `sensorsettings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `pushEnd` on the `sensorsettings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `sensorsettings` MODIFY `pushStart` DATETIME NOT NULL,
    MODIFY `pushEnd` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `token` TEXT NULL;
