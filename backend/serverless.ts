import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  org: 'hettest',
  app: 'seproject',
  service: 'backend',
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
    },
    createMCQQuestion: {
      handler: 'src/createMCQQuestion.handler',
      events: [
        {
          http: {
            path: '/create-mcq-question',
            method: 'POST',
          }
        }
      ]
    },
    enterRoom: {
      handler: 'src/enterRoom.handler',
      events: [
        {
          http: {
            path: '/enter-room',
            method: 'POST'
          }
        }
      ]
    },
    voteMCQQuestion: {
      handler: 'src/voteMCQQuestion.handler',
      events: [
        {
          http: {
            path: '/vote-mcq',
            method: 'POST'
          }
        }
      ]
    },
    fetchAnalytics: {
      handler: 'src/fetchAnalytics.handler',
      events: [
        {
          http: {
            path: '/fetch-analytics',
            method: 'POST'
          }
        }
      ]
    }
  },
  package: {
    patterns: [
      '!node_modules/.prisma/client/libquery_engine-*',
      'node_modules/.prisma/client/libquery_engine-rhel-*',
    ]
  }
};

module.exports = serverlessConfiguration;