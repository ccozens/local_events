import { test, expect } from 'vitest';

test('2+2', () => { expect(2 + 2).toBe(4) })

/* import {describe, expect, test, vi } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/__mocks__/prisma';
import handler from '../src/pages/api/locations/index';

describe('Locations API', () => {


test('POST /api/locations', async () => {
    const newLocationRequest = {
            name: 'Test Location',
            address: '123 Test St',
            website: 'https://test.com',
            phone: '123-456-7890',
            lat: 1,
            lng: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
    };

    prisma.location.create.mockResolvedValue({...newLocationRequest, id: 1});
    const newLocation = await handler(mockRequest, {} as NextApiResponse);
    expect(newLocation).toStrictEqual({
        ...newLocationRequest,
        id: 1
    });
    });
})
/* test('PUT /api/locations', async () => {
    const req = {
        method: 'PUT',
        body: {
            id: 1,
            name: 'Test Location',
            address: '123 Test St',
            website: 'https://test.com',
            phone: '123-456-7890',
            lat: 1,
            lng: 1,
        },
    };
    const res = {
        status: (code: number) => {
            expect(code).toBe(200);
            return res;
        },
        json: (data: any) => {
            expect(data).toEqual({message: 'Location updated'});
        },
    };
}); */
// }); */