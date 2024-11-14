import { UpdateUserDTO, UserDTO } from "../models/user.model";
import { AppError } from "../utils/customError";
import { firestore } from "../setup";

export class UserService {
    private collection;
    constructor() {
        this.collection = firestore.collection('users');
    }

    async create(data: UserDTO) {
        await this.collection.doc(data.id).create(data);
    }

    async getOne(id: string) {
        const userDocument = await this.collection.doc(id).get();

        if (!userDocument.exists) throw new AppError('user not found', 404);

        return userDocument.data() as UserDTO;
    }

    async getMany() {
        const snapshots = await this.collection.get();
        return snapshots.docs.map((doc) => ({ ...doc.data() })) as UserDTO[];
    }

    async update(id: string, newData: UpdateUserDTO) {
        await this.collection.doc(id).update(newData);
    }

    async delete(id: string) {
        await this.collection.doc(id).delete({ exists: true });
    }
}