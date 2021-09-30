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
import { validateEventSchema } from './utils/validateEventSchema';
import Joi from 'joi';
import createHttpError from 'http-errors';
const prisma = new PrismaClient()

const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { playerId, name, title } = event.body as any;

  console.log('Reached here');
  
  let player;
  try {
    player = await createOrFetchPlayer({playerId, name}, prisma);
  } catch (error) {
    console.log(error);
    console.log('Could not create/fetch player');
    throw new createHttpError.InternalServerError('Unable to fetch player details');
  }

  console.log('Fetched player');
  

  const key = generateRoomKey(); // Generate random room code
  const token = createToken(player.id); // Generate player auth token to be attached with every subsequent request

  console.log('Creating room');
  

  const room = await prisma.room.create({
    data: {
      host: {
        connect: { id: player.id }
      },
      key,
      title
    }
  })

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

module.exports.handler = handler