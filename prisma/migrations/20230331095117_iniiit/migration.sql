-- AlterTable
ALTER TABLE `sensor` MODIFY `uptime` BIGINT NULL;

-- AlterTable
ALTER TABLE `sensorsettings` ADD COLUMN `options` JSON NULL,
    ADD COLUMN `schedule` JSON NULL,
    MODIFY `pushStart` TIME NULL,
    MODIFY `pushEnd` TIME NULL,
    MODIFY `triggerMin` INTEGER NULL,
    MODIFY `triggerMax` INTEGER NULL;

-- AlterTable
ALTER TABLE `stationsettings` ADD COLUMN `options` JSON NULL;
