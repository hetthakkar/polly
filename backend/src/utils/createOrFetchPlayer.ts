import { Player, PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';

export async function createOrFetchPlayer(input: {playerId?: string, name?: string}, prisma: PrismaClient): Promise<Player> {
  let player: Player | null;
  const {playerId, name} = input;

  if(!playerId && !name) {
    throw new createHttpError.BadRequest('Insufficient inputs');
  }

  if (!playerId) {
    player = await prisma.player.create({
      data: {
        name: name!,
      }
    })
  } else {
    player = await prisma.player.findFirst({
      where: {
        id: playerId,
      }
    })
  }

  if(!player) {
    throw new createHttpError.BadRequest('Invalid player');
  }

  return player;
}