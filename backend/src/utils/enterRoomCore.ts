import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { createOrFetchPlayer } from './createOrFetchPlayer';
import { createToken } from './createToken';
import { fetchRoomData } from './fetchRoomData';

export async function enterRoomCore(playerId: string, name: string, roomKey: string, prisma = new PrismaClient()) {
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

  return { token, questionData };

}