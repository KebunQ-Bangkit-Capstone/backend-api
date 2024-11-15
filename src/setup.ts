import { Storage } from '@google-cloud/storage';
import { Pool } from 'pg';

export const storage = new Storage({ keyFilename: 'key.json' });

// local setup
export const sql = new Pool({
    user: 'postgres',
    database: 'kebunq',
    max: 20,
});