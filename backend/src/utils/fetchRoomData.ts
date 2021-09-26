import { MCQQuestion, PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';

export async function fetchRoomData(roomKey: string, onlyFetchPublished: boolean, prisma: PrismaClient) {

  const questionData: {
    mcqQuestions: Partial<MCQQuestion>[],
    // Add more question types here
  } = {
    mcqQuestions: []
  }

  const { id: roomId } = await prisma.room.findFirst({
    where: {
      key: roomKey,
    },
    select: {
      id: true
    }
  }) || {};

  if (!roomId) {
    throw new createHttpError.BadRequest('Invalid room key');
  }

  const mcqQuestionQueryResult = await prisma.question.findMany({
    where: {
      roomId,
      isPublished: !onlyFetchPublished,
    },
    select: {
      mcqQuestion: true,
    }
  })

  questionData.mcqQuestions = mcqQuestionQueryResult.filter((value) => {
    return value.mcqQuestion;
  }).map((value) => {
    return {
      ...(value.mcqQuestion)
    }
  });


  // TODO Add room fetching logic for more question types


}