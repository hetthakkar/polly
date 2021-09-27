import { PrismaClient, QuestionType } from '@prisma/client';

export async function fetchAnalytics(roomId: string, prisma = new PrismaClient()) {

  const mcqQuestionIds = (await prisma.question.findMany({
    where: {
      roomId,
    },
    select: {
      id: true,
    }
  })).map((question) => question.id);

  const mcqQuestionData = await prisma.mCQQuestionPlayerAnswer.groupBy({
    by: ['answerId', 'qid'],
    having: {
      qid: {
        in: mcqQuestionIds
      }
    },
    _count: {
      answerId: true,
    }
  });

  return mcqQuestionData;

}