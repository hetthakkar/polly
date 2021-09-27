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
import { validateEventSchema } from './utils/validateEventSchema';
import Joi from 'joi';
import cors from '@middy/http-cors';
const prisma = new PrismaClient();

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, name, roomKey } = event.body as any;
  const player = await createOrFetchPlayer({ playerId, name }, prisma);

  if (!player) {
    throw new createHttpError.InternalServerError('Unable to fetch/create player data');
  }

  const { id: roomId } = (await prisma.room.findFirst({
    where: {
      key: roomKey,
    },
    select: {
      id: true,
    }
  }))!;

  if (!roomId) {
    throw new createHttpError.BadRequest('Invalid room key');
  }

  // Add this player to the list of players in the room
  try {
    await prisma.roomPlayer.create({
      data: {
        pid: player.id,
        roomId,
      }
    })
  } catch (error) {
    console.log(error);
    throw new createHttpError.InternalServerError('Unable to add player to room')
  }

  const questionData = await fetchRoomData(roomKey, true, prisma);
  const token = createToken(player.id);

  console.log(questionData);


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
    name: Joi.string().required(),
    roomKey: Joi.string().required(),
  })))
  .use(httpErrorHandler())
  .use(cors({
    origin: process.env.ALLOWED_ORIGIN
  }))

module.exports.handler = handler;