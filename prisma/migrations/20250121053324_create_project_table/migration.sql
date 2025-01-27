/*
  Warnings:

  - You are about to alter the column `designation_role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `designation_role` ENUM('sde', 'project_manager', 'technical_lead') NOT NULL DEFAULT 'sde';

-- CreateTable
CREATE TABLE `projects` (
    `projectId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_At` DATETIME(3) NOT NULL,

    PRIMARY KEY (`projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `users_email_idx` ON `users`(`email`);
