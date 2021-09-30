import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client'
import { checkAuth } from './utils/checkAuth';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';
import { validateEventSchema } from './utils/validateEventSchema';
import Joi from 'joi';
import { createRoomCore } from './utils/createRoomCore';
const prisma = new PrismaClient()

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, name, title } = event.body as any;

  const {room, token} = await createRoomCore(playerId, name, title, prisma);

  await prisma.$disconnect();

  return {
    statusCode: 200,
    body: JSON.stringify({
      room,
      token
    })
  }
})

handler
  .use(httpJsonBodyParser())
  .use(checkAuth())
  .use(validateEventSchema(Joi.object({
    playerId: Joi.string(),
    name: Joi.string().required(),
    title: Joi.string().required(),
  })))
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))
