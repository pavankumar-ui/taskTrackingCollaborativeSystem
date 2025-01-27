-- DropIndex
DROP INDEX `projects_ownerId_fkey` ON `projects`;

-- CreateTable
CREATE TABLE `tasks` (
    `Tid` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `status` ENUM('open', 'in_progress', 'completed') NOT NULL DEFAULT 'open',
    `assignedTo` INTEGER NULL,
    `projectId` INTEGER NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Tid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
