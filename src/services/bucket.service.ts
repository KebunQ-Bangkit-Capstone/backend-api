import { Storage } from "@google-cloud/storage";
import { DatabaseError } from "../utils/customError";

const storage = new Storage({ keyFilename: 'key.json' });

export class BucketService {
    constructor(private bucketName = 'kebunq-db') { }

    async upload(file: File, fileId: string) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            storage.bucket(this.bucketName).file(fileId).save(buffer);
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async download(fileId: string) {
        try {
            const [data] = await storage.bucket(this.bucketName).file(fileId).download();
            const blob = new Blob([data]);
            return new File([blob], fileId);
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    // async delete(destination: string) {
    // }
}