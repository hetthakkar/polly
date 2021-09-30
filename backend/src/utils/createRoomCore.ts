import { PrismaClient } from '@prisma/client';
import { createOrFetchPlayer } from './createOrFetchPlayer';
import createHttpError from 'http-errors';
import { generateRoomKey } from './generateRoomKey';
import { createToken } from './createToken';

export async function createRoomCore(playerId: string | undefined, name: string, title: string, prisma = new PrismaClient()) {
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
  });

  return {room, token};
}