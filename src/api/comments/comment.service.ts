import { CommentDTO, UpdateCommentDTO } from "./comment.model";
import { DatabaseError } from "../../utils/customError";
import { prisma } from "../../setup";

export class CommentService {
  constructor() { }

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
        data: { ...newData },
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
