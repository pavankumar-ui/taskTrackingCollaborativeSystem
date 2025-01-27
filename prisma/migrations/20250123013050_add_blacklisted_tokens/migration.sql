-- DropIndex
DROP INDEX `projects_ownerId_fkey` ON `projects`;

-- DropIndex
DROP INDEX `tasks_assignedTo_fkey` ON `tasks`;

-- DropIndex
DROP INDEX `tasks_projectId_fkey` ON `tasks`;

-- DropIndex
DROP INDEX `team_members_teamId_fkey` ON `team_members`;

-- DropIndex
DROP INDEX `team_members_userId_fkey` ON `team_members`;

-- DropIndex
DROP INDEX `teams_projectId_fkey` ON `teams`;

-- CreateTable
CREATE TABLE `blacklisted_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `blacklisted_tokens_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`Pid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`Pid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_members` ADD CONSTRAINT `team_members_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `teams`(`teamId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_members` ADD CONSTRAINT `team_members_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
