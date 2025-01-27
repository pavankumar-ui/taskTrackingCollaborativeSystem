-- DropIndex
DROP INDEX `projects_ownerId_fkey` ON `projects`;

-- DropIndex
DROP INDEX `tasks_assignedTo_fkey` ON `tasks`;

-- DropIndex
DROP INDEX `tasks_projectId_fkey` ON `tasks`;

-- CreateTable
CREATE TABLE `teams` (
    `teamId` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,
    `Team_name` VARCHAR(191) NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    INDEX `teams_Team_name_idx`(`Team_name`),
    PRIMARY KEY (`teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`Pid`) ON DELETE RESTRICT ON UPDATE CASCADE;
