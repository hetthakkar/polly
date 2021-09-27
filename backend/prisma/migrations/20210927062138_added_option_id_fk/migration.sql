/*
  Warnings:

  - You are about to drop the column `answer` on the `MCQQuestionPlayerAnswer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[answerId]` on the table `MCQQuestionPlayerAnswer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answerId` to the `MCQQuestionPlayerAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MCQQuestionPlayerAnswer` DROP COLUMN `answer`,
    ADD COLUMN `answerId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MCQQuestionPlayerAnswer_answerId_unique` ON `MCQQuestionPlayerAnswer`(`answerId`);

-- AddForeignKey
ALTER TABLE `MCQQuestionPlayerAnswer` ADD CONSTRAINT `MCQQuestionPlayerAnswer_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `MCQOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
