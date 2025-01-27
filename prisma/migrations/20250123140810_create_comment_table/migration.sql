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
CREATE TABLE `comments` (
    `commentId` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    INDEX `comments_commentId_idx`(`commentId`),
    INDEX `comments_taskId_idx`(`taskId`),
    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attachments` (
    `attachmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `uploadedBy` INTEGER NOT NULL,
    `uploaded_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    PRIMARY KEY (`attachmentId`)
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
