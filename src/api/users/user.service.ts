import { UpdateUserDTO, UserDTO } from "./user.model";
import { DatabaseError } from "../../utils/customError";
import { prisma } from "../../utils/prisma";

export class UserService {
    async create(data: UserDTO) {
        try {
            await prisma.users.create({
                data: { ...data }
            });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async getOne(id: string) {
        try {
            return await prisma.users.findUniqueOrThrow({ where: { user_id: id } });
        } catch (err: any) {
            if (err.code === 'P2025') {
                throw new DatabaseError('User not found', 404);
            }
            throw new DatabaseError(err.message);
        }
    }

    async getMany() {
        try {
            return await prisma.users.findMany();
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async update(id: string, newData: UpdateUserDTO) {
        try {
            await prisma.users.update({
                where: { user_id: id },
                data: { ...newData }
            })
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async delete(id: string) {
        try {
            await prisma.users.delete({ where: { user_id: id } });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }
}