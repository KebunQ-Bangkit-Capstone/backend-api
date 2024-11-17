import { PrismaClient } from "@prisma/client";
import { CommentDTO, UpdateCommentDTO } from "./comment.model";
import { DatabaseError } from "../../utils/customError";

const prisma = new PrismaClient();

export class CommentService {
  constructor() {}

  async create(data: Omit<CommentDTO, "comment_id">) {
    try {
      await prisma.comments.create({
        data: {
          user_id: data.user_id,
          discussion_id: data.discussion_id,
          content: data.content,
          created_at: new Date(data.created_at),
        },
      });
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }

  async getOne(comment_id: string) {
    try {
      const comment = await prisma.comments.findUnique({
        where: { comment_id },
      });
      if (!comment) {
        throw new DatabaseError("Comment not found", 404);
      }
      return comment;
    } catch (err: any) {
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
      await this.getOne(comment_id);
      await prisma.comments.update({
        where: { comment_id },
        data: newData,
      });
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }

  async delete(comment_id: string) {
    try {
      await this.getOne(comment_id);
      await prisma.comments.delete({
        where: { comment_id },
      });
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }
}
