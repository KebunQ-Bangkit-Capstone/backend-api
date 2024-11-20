import { CommentDTO, UpdateCommentDTO } from "./comment.model";
import { DatabaseError } from "../../utils/customError";
import { prisma } from "../../utils/prisma";

export class CommentService {
    async create(data: Omit<CommentDTO, "comment_id">) {
        try {
            await prisma.comments.create({
                data: { ...data },
            });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async getOne(comment_id: string) {
        try {
            return await prisma.comments.findUniqueOrThrow({ where: { comment_id } });
        } catch (err: any) {
            if (err.code === 'P2025') {
                throw new DatabaseError('Comment not found', 404);
            }
            throw new DatabaseError(err.message);
        }
    }

    async getMany() {
        try {
            return await prisma.comments.findMany();
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async update(comment_id: string, newData: UpdateCommentDTO) {
        try {
            await prisma.comments.update({
                where: { comment_id },
                data: { ...newData },
            });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async delete(comment_id: string) {
        try {
            await prisma.comments.delete({ where: { comment_id } });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }
}
