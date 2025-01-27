/*
  Warnings:

  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectId` on the `projects` table. All the data in the column will be lost.
  - Added the required column `Pid` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `projects_ownerId_fkey` ON `projects`;

-- AlterTable
ALTER TABLE `projects` DROP PRIMARY KEY,
    DROP COLUMN `projectId`,
    ADD COLUMN `Pid` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Pid`);

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
