import { PrismaClient, QuestionType } from '@prisma/client';
import createHttpError from 'http-errors';
import { verifyHost } from './verifyHost';

export async function createMcqQuestionCore(playerId: string, roomId: string, title: string, options: string[], correctAnswer:number, prisma = new PrismaClient()) {
  if (!(await verifyHost(playerId, roomId, prisma))) {
    throw new createHttpError.Forbidden('Not allowed');
  }

  const question = await prisma.question.create({
    data: {
      roomId,
      questionType: QuestionType.MCQ,
      mcqQuestion: {
        create: {
          description: title,
          correctAnswer: correctAnswer,
        }
      }
    }
  })

  const _options = await prisma.mCQOption.createMany({
    data:
      options.map((option: string) => {
        return {
          description: option,
          questionId: question.id
        }
      })
  })

  return { question, options }

}