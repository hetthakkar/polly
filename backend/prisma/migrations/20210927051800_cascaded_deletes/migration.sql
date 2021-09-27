-- DropForeignKey
ALTER TABLE `MCQOption` DROP FOREIGN KEY `MCQOption_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `MCQQuestion` DROP FOREIGN KEY `MCQQuestion_qid_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_roomId_fkey`;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MCQQuestion` ADD CONSTRAINT `MCQQuestion_qid_fkey` FOREIGN KEY (`qid`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MCQOption` ADD CONSTRAINT `MCQOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `MCQQuestion`(`qid`) ON DELETE CASCADE ON UPDATE CASCADE;
