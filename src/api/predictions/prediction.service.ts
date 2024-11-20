import { DatabaseError } from "../../utils/customError";
import { prisma } from "../../utils/prisma";
import { PredictionDTO } from "./prediction.model";

export class PredictionService {
    constructor() { }

    async create(data: PredictionDTO) {
        try {
            await prisma.predictions.create({
                data: { ...data }
            });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async getOne(id: string) {
        try {
            return await prisma.predictions.findUniqueOrThrow({ where: { prediction_id: id } });
        } catch (err: any) {
            if (err.code === 'P2025') {
                throw new DatabaseError('Prediction not found', 404);
            }
            throw new DatabaseError(err.message);
        }
    }

    async getManyByUserId(userId: string) {
        try {
            return await prisma.predictions.findMany({ where: { user_id: userId } });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async getMany() {
        try {
            return await prisma.predictions.findMany();
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    // async update() {
    //     return 'update prediction';
    // }

    async delete(id: string) {
        try {
            await prisma.predictions.delete({ where: { prediction_id: id } });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }
}