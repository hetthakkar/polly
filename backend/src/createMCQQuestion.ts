import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient, QuestionType } from '@prisma/client'
import { checkAuth } from './utils/checkAuth';
import httpErrorHandler from '@middy/http-error-handler';
import createHttpError from 'http-errors';
import { verifyHost } from './utils/verifyHost';
import Joi from 'joi';
import { validateEventSchema } from './utils/validateEventSchema';
const prisma = new PrismaClient()

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, roomId } = event.body as any;

  if (!verifyHost(playerId, roomId, prisma)) {
    throw new createHttpError.Forbidden('Not allowed');
  }

  const { title, options } = event.body as any;

  console.log();


  const question = await prisma.question.create({
    data: {
      roomId,
      questionType: QuestionType.MCQ,
      mcqQuestion: {
        create: {
          description: title,
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

  // TODO! Notify room players about question

  return {
    statusCode: 200,
    body: JSON.stringify({
      question,
      options,
    })
  }
})

handler
  .use(httpJsonBodyParser())
  .use(checkAuth({ blockExecution: true })) // Block execution if invalid token
  .use(validateEventSchema(
    Joi.object({
      playerId: Joi.string().required(),
      roomId: Joi.string().required(),
      title: Joi.string().required(),
      options: Joi.array().items(
        Joi.string().required()
      ).length(4).required(),
    })))
  .use(httpErrorHandler())

module.exports.handler = handler