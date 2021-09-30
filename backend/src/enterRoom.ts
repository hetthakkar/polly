import { PrismaClient } from '@prisma/client';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { checkAuth } from './utils/checkAuth';
import { validateEventSchema } from './utils/validateEventSchema';
import Joi from 'joi';
import cors from '@middy/http-cors';
import { enterRoomCore } from './utils/enterRoomCore';
const prisma = new PrismaClient();

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, name, roomKey } = event.body as any;
  
  const {token, questionData} = await enterRoomCore(playerId, name, roomKey, prisma);

  await prisma.$disconnect();

  return {
    body: JSON.stringify({
      token,
      questionData
    }),
    statusCode: 200,
  }
})

handler
  .use(httpJsonBodyParser())
  .use(checkAuth())
  .use(validateEventSchema(Joi.object({
    playerId: Joi.string(),
    name: Joi.string().required(),
    roomKey: Joi.string().required(),
  })))
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler;