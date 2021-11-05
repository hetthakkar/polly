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
import cors from '@middy/http-cors';
import { createMcqQuestionCore } from './utils/createMcqQuestionCore';
const prisma = new PrismaClient()

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, roomId, title, options } = event.body as any;

  const {question, options: _options} = await createMcqQuestionCore(playerId, roomId, title, options);
  
  await prisma.$disconnect();

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
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler