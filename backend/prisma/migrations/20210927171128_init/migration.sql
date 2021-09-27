-- CreateTable
CREATE TABLE `Player` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` VARCHAR(191) NOT NULL,
    `hostId` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `questionType` ENUM('MCQ', 'TF') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MCQQuestion` (
    `qid` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `correctAnswer` INTEGER,

    PRIMARY KEY (`qid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MCQOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomPlayer` (
    `pid` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pid`, `roomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerAnswer` (
    `pid` VARCHAR(191) NOT NULL,
    `qid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pid`, `qid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MCQQuestionPlayerAnswer` (
    `pid` VARCHAR(191) NOT NULL,
    `qid` VARCHAR(191) NOT NULL,
    `answerId` INTEGER NOT NULL,

    PRIMARY KEY (`pid`, `qid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MCQQuestion` ADD CONSTRAINT `MCQQuestion_qid_fkey` FOREIGN KEY (`qid`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MCQOption` ADD CONSTRAINT `MCQOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `MCQQuestion`(`qid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomPlayer` ADD CONSTRAINT `RoomPlayer_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomPlayer` ADD CONSTRAINT `RoomPlayer_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerAnswer` ADD CONSTRAINT `PlayerAnswer_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerAnswer` ADD CONSTRAINT `PlayerAnswer_qid_fkey` FOREIGN KEY (`qid`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MCQQuestionPlayerAnswer` ADD CONSTRAINT `MCQQuestionPlayerAnswer_pid_qid_fkey` FOREIGN KEY (`pid`, `qid`) REFERENCES `PlayerAnswer`(`pid`, `qid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MCQQuestionPlayerAnswer` ADD CONSTRAINT `MCQQuestionPlayerAnswer_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `MCQOption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
