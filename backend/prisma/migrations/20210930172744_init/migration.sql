-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MCQ', 'TF');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "questionType" "QuestionType" NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCQQuestion" (
    "qid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "correctAnswer" INTEGER,

    CONSTRAINT "MCQQuestion_pkey" PRIMARY KEY ("qid")
);

-- CreateTable
CREATE TABLE "MCQOption" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MCQOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomPlayer" (
    "pid" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomPlayer_pkey" PRIMARY KEY ("pid","roomId")
);

-- CreateTable
CREATE TABLE "PlayerAnswer" (
    "pid" TEXT NOT NULL,
    "qid" TEXT NOT NULL,

    CONSTRAINT "PlayerAnswer_pkey" PRIMARY KEY ("pid","qid")
);

-- CreateTable
CREATE TABLE "MCQQuestionPlayerAnswer" (
    "pid" TEXT NOT NULL,
    "qid" TEXT NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "MCQQuestionPlayerAnswer_pkey" PRIMARY KEY ("pid","qid")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQQuestion" ADD CONSTRAINT "MCQQuestion_qid_fkey" FOREIGN KEY ("qid") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQOption" ADD CONSTRAINT "MCQOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "MCQQuestion"("qid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomPlayer" ADD CONSTRAINT "RoomPlayer_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomPlayer" ADD CONSTRAINT "RoomPlayer_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_qid_fkey" FOREIGN KEY ("qid") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQQuestionPlayerAnswer" ADD CONSTRAINT "MCQQuestionPlayerAnswer_pid_qid_fkey" FOREIGN KEY ("pid", "qid") REFERENCES "PlayerAnswer"("pid", "qid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQQuestionPlayerAnswer" ADD CONSTRAINT "MCQQuestionPlayerAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "MCQOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
