import middy, { MiddlewareObj } from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import redis from 'redis';
import { setPlayerConnectionId } from './utils/setPlayerConnectionId';

const client = redis.createClient({
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
})

let handler = middy(async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const body: any = event.body;
  const { connectionId, routeKey } = event.requestContext;
  const { playerId } = event.body as any;

  switch(routeKey) {
    case '$connect':
      setPlayerConnectionId(playerId, connectionId!, client);
      break;
    case '$disconnect':
      // unsetPlayer socket data
    case '$default':
      console.log('Default socket event triggered');
      
  }


  console.log("Here", body);
  console.log("connectionId", connectionId, "routeKey", routeKey);
  

  return {
    statusCode: 200,
    body: 'Hello',
  }
})

handler
  .use(
    httpJsonBodyParser()
  )
module.exports.handler = handler
