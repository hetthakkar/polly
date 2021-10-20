import createHttpError from 'http-errors';
import { RedisClient } from 'redis';
import { promisify } from 'util';

export async function setPlayerConnectionId(playerId: string, connectionId: string, client: RedisClient) {

  if(!playerId) {
    throw new createHttpError.BadRequest('Connection ID cannot be null');
  }

  client.set(playerId, connectionId); 
}