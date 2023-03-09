/*
  Warnings:

  - You are about to alter the column `pushStart` on the `SensorSettings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `pushEnd` on the `SensorSettings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `SensorSettings` MODIFY `pushStart` DATETIME NOT NULL,
    MODIFY `pushEnd` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `hash_rst` VARCHAR(255) NULL,
    MODIFY `hash_vrf` VARCHAR(255) NULL;
