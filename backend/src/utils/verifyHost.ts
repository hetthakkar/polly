import { PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';

export async function verifyHost(playerId: string, roomId: string, prisma = new PrismaClient()): Promise<boolean> {

  const { hostId } = (await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      hostId: true,
    }
  }))!

  if(!hostId) {
    throw new createHttpError.BadRequest('Invalid roomId')
  }

  if(playerId !== hostId) {
    throw new createHttpError.Forbidden();
  }

  return true;

}