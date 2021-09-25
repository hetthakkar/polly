/*
  Warnings:

  - The primary key for the `RoomPlayer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roomId` on the `RoomPlayer` table. All the data in the column will be lost.
  - Added the required column `roomKey` to the `RoomPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RoomPlayer` DROP FOREIGN KEY `RoomPlayer_roomId_fkey`;

-- AlterTable
ALTER TABLE `RoomPlayer` DROP PRIMARY KEY,
    DROP COLUMN `roomId`,
    ADD COLUMN `roomKey` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`pid`, `roomKey`);

-- AddForeignKey
ALTER TABLE `RoomPlayer` ADD CONSTRAINT `RoomPlayer_roomKey_fkey` FOREIGN KEY (`roomKey`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
