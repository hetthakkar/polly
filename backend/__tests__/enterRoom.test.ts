import { Prisma, PrismaClient } from '@prisma/client'
import { createMcqQuestionCore } from '../src/utils/createMcqQuestionCore'
import { createRoomCore } from '../src/utils/createRoomCore'
import { enterRoomCore } from '../src/utils/enterRoomCore';

// Add custom matcher to namespace to avoid TS errors
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidEnterRoomResponse(): CustomMatcherResult
    }
  }
}

let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>

// Player ID of the host user
let playerId: string;
// Key of room that user will join
let roomKey: string;

beforeAll(async () => {
  // Initialize db connection
  prisma = new PrismaClient()

  const { id:hostPlayerId } = await prisma.player.create({
    data: {
      name: 'foo'
    },
    select: {
      id: true,
    }
  })

  const createRoomResponse = await createRoomCore(hostPlayerId, 'foo', 'bar', prisma);

  const {id} = await prisma.player.create({
    data: {
      name: 'non host player',
    },
    select: {
      id: true,
    }
  })

  let roomId = createRoomResponse.room.id;
  let roomKey = createRoomResponse.room.key;
  playerId = id;

})

afterAll(() => {
  // Cleanup db connection
  prisma.$disconnect()
})

// Create custom matcher to test a valid function reponse
expect.extend({
  toBeValidEnterRoomResponse(response) {
    if (
      response &&
      response.token &&
      response.questionData &&
      Array.isArray(response.questionData.mcqQuestions)
    ) {
      return {
        pass: true,
        message: () => 'Valid response',
      }
    }

    return {
      pass: false,
      message: () => 'Invalid response',
    }
  },
})

test('enter room with proper parameters', async () => {
  const res = await enterRoomCore(playerId, 'foo', roomKey, prisma);
  expect(res).toBeValidEnterRoomResponse();
})

test('enter room with invalid playerId', async () => {
  await expect(enterRoomCore('----', 'foo', roomKey, prisma)).rejects.toThrowError();
})

test('enter room with invalid roomKey', async () => {
  await expect(enterRoomCore(playerId, 'foo', '---', prisma)).rejects.toThrowError();
})

// If playerId is provided empty, a player is automatically created
test('enter room with empty playerId', async () => {
  expect(await enterRoomCore(undefined, 'foo', roomKey, prisma)).toBeValidEnterRoomResponse();
})

test('create question with empty roomKey', async () => {
  await expect(enterRoomCore(playerId, 'foo', undefined, prisma)).rejects.toThrowError();
})
