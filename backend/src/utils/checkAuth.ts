import { MiddlewareObj } from '@middy/core';
import createHttpError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function checkAuth(blockExecution: boolean = false): MiddlewareObj {
  return {
    before: (handler) => {
      const token = handler.event.headers['AUTH_TOKEN'];

      if (!token && blockExecution) {
        throw new createHttpError.Forbidden('Missing token');
      }

      try {
        const { playerId } = jwt.verify(token, process.env['JWT_SECRET']!) as JwtPayload;
        handler.event.body['playerId'] = playerId;
      } catch (error) {
        if (blockExecution) {
          throw new createHttpError.Forbidden('Invalid token')
        }
      }

    }
  }
}