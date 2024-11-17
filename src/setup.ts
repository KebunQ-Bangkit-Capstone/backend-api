import { Storage } from '@google-cloud/storage';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

export const storage = new Storage({ keyFilename: 'key.json' });

// local setup
export const sql = new Pool({
    user: 'postgres',
    database: 'kebunq',
    max: 20,
});

export const prisma = new PrismaClient();