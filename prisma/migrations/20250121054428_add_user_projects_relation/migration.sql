-- CreateIndex
CREATE INDEX `projects_name_idx` ON `projects`(`name`);

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
