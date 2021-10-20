import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

module.exports.hello = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        envVars: process.env,
        input: event,
      },
      null,
      2
    ),
  };
};
