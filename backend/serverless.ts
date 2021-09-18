import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'aws-nodejs-typescript',
  frameworkVersion: '2',
  plugins: [
    'serverless-plugin-typescript',
    'serverless-offline'
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    connectionHandler: {
      handler: 'src/connection.handler',
      events: [
        {
          http: {
            path: '/hello',
            method: 'GET'
          }
        },
      ]
    },
    createRoom: {
      handler: 'src/createRoom.handler',
      events: [
        {
          http: {
            path: '/create-room',
            method: 'POST'
          }
        }
      ]
    }
  },
};

module.exports = serverlessConfiguration;