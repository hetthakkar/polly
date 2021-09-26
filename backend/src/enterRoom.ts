import { PrismaClient } from '@prisma/client';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { checkAuth } from './utils/checkAuth';
import { createOrFetchPlayer } from './utils/createOrFetchPlayer';
import createHttpError from 'http-errors';
import { fetchRoomData } from './utils/fetchRoomData';
import { createToken } from './utils/createToken';
const prisma = new PrismaClient();

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const {playerId, name, roomKey} = event.body as any;
  const player = await createOrFetchPlayer({playerId, name}, prisma);

  if(!player) {
    throw new createHttpError.InternalServerError('Unable to fetch/create player data');
  }

  // Add this player to the list of players in the room
  try {
    await prisma.roomPlayer.create({
      data: {
        pid: player.id,
        roomKey
      }
    })
  } catch (error) {
    console.log('Unable to add player to room');
    throw new createHttpError.InternalServerError('Unable to create room')
  }

  const questionData = await fetchRoomData(roomKey, true, prisma);
  const token = createToken(player.id);

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
  .use(httpErrorHandler())
  
module.exports.handler = handler;