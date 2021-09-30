import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {  PrismaClient } from '@prisma/client'
import { checkAuth } from './utils/checkAuth';
import httpErrorHandler from '@middy/http-error-handler';
import { validateEventSchema } from './utils/validateEventSchema';
import Joi from 'joi';
import { fetchAnalytics } from './utils/fetchAnalytics';
import cors from '@middy/http-cors';
const prisma = new PrismaClient()

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, roomId } = event.body as any;

  const analytics = await fetchAnalytics(roomId, prisma);

  await prisma.$disconnect();

  return {
    statusCode: 200,
    body: JSON.stringify({
      analytics,
    })
  }
})

handler
  .use(httpJsonBodyParser())
  .use(checkAuth({blockExecution: true}))
  .use(validateEventSchema(Joi.object({
    playerId: Joi.string().required(),
    roomId: Joi.string().required(),
  })))
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler