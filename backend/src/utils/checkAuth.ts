import { MiddlewareObj } from '@middy/core';
import createHttpError from 'http-errors';
import { boolean } from 'joi';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface checkAuthInput {
  blockExecution: boolean;
}

export function checkAuth(input: checkAuthInput = {blockExecution: false}): MiddlewareObj {
  return {
    before: (handler) => {
      const token = handler.event.headers['auth_token'] || handler.event.headers['AUTH_TOKEN'];

      console.log('Value of the token is', token);
      console.log('Value of headers is', handler.event.headers);
      
      

      if (!token && input.blockExecution) {
        throw new createHttpError.Forbidden('Missing token');
      }

      try {
        const { playerId } = jwt.verify(token, process.env['JWT_SECRET']!) as JwtPayload;
        handler.event.body['playerId'] = playerId;
      } catch (error) {
        console.log(error);
        
        if (input.blockExecution) {
          throw new createHttpError.Forbidden('Invalid token')
        }
      }

    }
  }
}