import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client'
import { generateRoomKey } from './utils/generateRoomKey';
import { checkAuth } from './utils/checkAuth';
import { createToken } from './utils/createToken';
import httpErrorHandler from '@middy/http-error-handler';
import { createOrFetchPlayer } from './utils/createOrFetchPlayer';
import cors from '@middy/http-cors';
const prisma = new PrismaClient()

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, name } = event.body as any;

  const player = await createOrFetchPlayer({playerId, name}, prisma);

  const key = generateRoomKey(); // Generate random room code
  console.log('Key is', key);
  const token = createToken(player.id); // Generate player auth token to be attached with every subsequent request

  const room = await prisma.room.create({
    data: {
      host: {
        connect: { id: player.id }
      },
      key,
    }
  })

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
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler