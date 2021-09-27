import { PrismaClient } from '@prisma/client';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { checkAuth } from './utils/checkAuth';
import { validateEventSchema } from './utils/validateEventSchema';
import Joi from 'joi';
const prisma = new PrismaClient();

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, questionId, answerId } = event.body as any;

  const playerAnswer = await prisma.playerAnswer.create({
    data: {
      qid: questionId,
      pid: playerId,
      mcqQuestionPlayerAnswer: {
        create: {
          answerId,
        }
      }
    }
  })


  return {
    body: JSON.stringify({
      playerAnswer
    }),
    statusCode: 200,
  }
})

handler
  .use(httpJsonBodyParser())
  .use(checkAuth({ blockExecution: true }))
  .use(validateEventSchema(Joi.object({
    playerId: Joi.string().required(),
    questionId: Joi.string().required(),
    answerId: Joi.number().positive().required(),
  })))
  .use(httpErrorHandler())

module.exports.handler = handler;