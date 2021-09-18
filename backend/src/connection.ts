import middy, { MiddlewareObj } from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

let handler = middy(async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  const body: any = event.body;
  const { connectionId, routeKey } = event.requestContext;

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
