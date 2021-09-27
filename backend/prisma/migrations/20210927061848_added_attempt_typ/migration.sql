/*
  Warnings:

  - You are about to drop the column `answer` on the `PlayerAnswer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PlayerAnswer` DROP COLUMN `answer`;

-- CreateTable
CREATE TABLE `MCQQuestionPlayerAnswer` (
    `pid` VARCHAR(191) NOT NULL,
    `qid` VARCHAR(191) NOT NULL,
    `answer` INTEGER NOT NULL,

    PRIMARY KEY (`pid`, `qid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MCQQuestionPlayerAnswer` ADD CONSTRAINT `MCQQuestionPlayerAnswer_pid_qid_fkey` FOREIGN KEY (`pid`, `qid`) REFERENCES `PlayerAnswer`(`pid`, `qid`) ON DELETE CASCADE ON UPDATE CASCADE;
