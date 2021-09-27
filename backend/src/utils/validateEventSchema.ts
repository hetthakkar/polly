import { MiddlewareObj } from '@middy/core';
import createHttpError from 'http-errors';
import Joi from 'joi';

export function validateEventSchema(schema: Joi.Schema): MiddlewareObj {
  return {
    before: (handler) => {
      const result = schema.validate(handler.event.body);

      if(result.error) {
        throw new createHttpError.BadRequest(result.error.message);
      }

      handler.event.body = result.value;
    }
  }
}