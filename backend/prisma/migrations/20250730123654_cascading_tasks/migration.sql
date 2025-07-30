/*
  Warnings:

  - You are about to alter the column `status` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `priority` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_parent_task_id_fkey`;

-- DropIndex
DROP INDEX `categories_user_id_fkey` ON `categories`;

-- DropIndex
DROP INDEX `tasks_category_id_fkey` ON `tasks`;

-- DropIndex
DROP INDEX `tasks_parent_task_id_fkey` ON `tasks`;

-- AlterTable
ALTER TABLE `tasks` MODIFY `status` ENUM('PENDING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED') NOT NULL,
    MODIFY `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `refresh_token` TEXT NULL;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_parent_task_id_fkey` FOREIGN KEY (`parent_task_id`) REFERENCES `tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
