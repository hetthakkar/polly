import { Prisma, PrismaClient } from '@prisma/client'
import { createMcqQuestionCore } from '../src/utils/createMcqQuestionCore'
import { createRoomCore } from '../src/utils/createRoomCore'

// Add custom matcher to namespace to avoid TS errors
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidCreateMcqQuestionResponse(): CustomMatcherResult
    }
  }
}

let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>

// Player ID of the host user
let hostPlayerId: string;
// Player ID of user who is not a host
let otherPlayerId: string;
let roomId: string;

beforeAll(async () => {
  // Initialize db connection
  prisma = new PrismaClient()

  const { id } = await prisma.player.create({
    data: {
      name: 'foo'
    },
    select: {
      id: true,
    }
  })

  const res = await createRoomCore(id, 'foo', 'bar', prisma);

  const {id: pid} = await prisma.player.create({
    data: {
      name: 'non host player',
    },
    select: {
      id: true,
    }
  })

  roomId = res.room.id;
  hostPlayerId = id;
  otherPlayerId = pid;

})

afterAll(() => {
  // Cleanup db connection
  prisma.$disconnect()
})

// Create custom matcher to test a valid function reponse
expect.extend({
  toBeValidCreateMcqQuestionResponse(response) {
    if (
      response &&
      response.options &&
      response.options.length &&
      response.question &&
      response.question.id &&
      response.question.questionType === 'MCQ'
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

test('create question with proper parameters', async () => {
  const res = await createMcqQuestionCore(hostPlayerId, roomId, 'foo question', ['a', 'b', 'c', 
'd'],1, prisma);
  expect(res).toBeValidCreateMcqQuestionResponse();
})

test('create question with invalid playerId', async () => {
  await expect( createMcqQuestionCore('----', roomId, 'foo question', ['a', 'b', 'c', 
  'd'],1, prisma)).rejects.toThrowError();
})

test('create question from player who is not the host', async () => {
  await expect(createMcqQuestionCore(otherPlayerId, roomId, 'foo question', ['a', 'b', 'c', 
  'd'],1, prisma)).rejects.toThrowError()
})

test('create question with empty question title', async () => {
  await expect(createMcqQuestionCore(hostPlayerId, roomId, undefined, ['a', 'b', 'c', 
  'd'],1, prisma)).rejects.toThrowError()
})

test('create question with empty options', async () => {
  await expect(createMcqQuestionCore(hostPlayerId, roomId, 'foo title', undefined,1, prisma)).rejects.toThrowError()
})
