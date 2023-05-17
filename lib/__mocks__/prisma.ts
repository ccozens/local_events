import { PrismaClient } from '@prisma/client';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

// reset mock between each test
beforeEach(() => {
    mockReset(prisma)
});

// create deep mock that mocks all properties of the object
const prisma = mockDeep<PrismaClient>();
export default prisma;
