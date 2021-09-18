import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PrismaClient } from '@prisma/client'
import { generateRoomKey } from './utils/generateRoomKey';
const prisma = new PrismaClient()

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, name } = event.body as any;

  let player;
  if (!playerId) {
    player = await prisma.player.create({
      data: {
        name,
      }
    })
  } else {
    player = await prisma.player.findFirst({
      where: {
        id: playerId,
      }
    })
  }

  const key = generateRoomKey();

  const room = await prisma.room.create({
    data: {
      host: {
        connect: { id: playerId }
      },
      key,
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      room,
      player,
    })
  }
})

handler
  .use(httpJsonBodyParser())

module.exports.handler = handler