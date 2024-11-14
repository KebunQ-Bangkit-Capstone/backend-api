import { Firestore } from "@google-cloud/firestore";
import { Storage } from '@google-cloud/storage';

// key.json is located in project root
export const firestore = new Firestore({ databaseId: 'kebun-q', keyFilename: 'key.json' });
export const storage = new Storage({ keyFilename: 'key.json' });