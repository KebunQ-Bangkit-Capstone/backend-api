import { Storage } from "@google-cloud/storage";
import { DatabaseError } from "../utils/customError";

const storage = new Storage();

export class BucketService {
    constructor(private bucketName = 'kebunq-db') { }

    async upload(file: File, fileId: string) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await storage.bucket(this.bucketName).file(fileId).save(buffer);
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

    async getSignedUrl(fileId: string) {
        try {
            const [url] = await storage.bucket(this.bucketName).file(fileId).getSignedUrl({
                action: 'read',
                expires: Date.now() + 300000 // 5 minutes
            });

            return url;
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    // async delete(destination: string) {
    // }
}