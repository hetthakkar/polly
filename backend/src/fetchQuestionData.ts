import { PrismaClient } from '@prisma/client';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { checkAuth } from './utils/checkAuth';
import { validateEventSchema } from './utils/validateEventSchema';
import Joi from 'joi';
import cors from '@middy/http-cors';
import { fetchRoomData } from './utils/fetchRoomData';
const prisma = new PrismaClient();

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const {roomKey } = event.body as any;
  
  const questionData = await fetchRoomData(roomKey, true, prisma);

  await prisma.$disconnect();

  return {
    body: JSON.stringify({
        questionData
    }),
    statusCode: 200,
  }
})

handler
  .use(httpJsonBodyParser())
//   .use(checkAuth())
  .use(validateEventSchema(Joi.object({
    roomKey: Joi.string().required(),
  })))
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler;