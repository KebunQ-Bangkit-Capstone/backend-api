import { PrismaClient } from "@prisma/client";
import { DiscussionDTO, UpdateDiscussionDTO } from "./discussion.model";
import { DatabaseError } from "../../utils/customError";

const prisma = new PrismaClient();

export class DiscussionService {
  constructor() {}

  async create(data: Omit<DiscussionDTO, "discussion_id">) {
    try {
      await prisma.discussion.create({
        data: {
          user_id: data.user_id,
          content: data.content,
          image: data.image,
          created_at: new Date(data.created_at),
        },
      });
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }

  async getOne(id: string) {
    try {
      const discussion = await prisma.discussion.findUnique({
        where: { discussion_id: id },
      });

      if (!discussion) {
        throw new DatabaseError("Discussion not found", 404);
      }

      return discussion;
    } catch (err: any) {
      if (err.statusCode === 404) {
        throw err;
      }
      throw new DatabaseError(err.message);
    }
  }

  async getMany() {
    try {
      return await prisma.discussion.findMany();
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }

  async update(id: string, newData: UpdateDiscussionDTO) {
    try {
      await this.getOne(id);
      await prisma.discussion.update({
        where: { discussion_id: id },
        data: newData,
      });
    } catch (err: any) {
      if (err.statusCode === 404) {
        throw err;
      }
      throw new DatabaseError(err.message);
    }
  }

  async delete(id: string) {
    try {
      await this.getOne(id);
      await prisma.discussion.delete({
        where: { discussion_id: id },
      });
    } catch (err: any) {
      if (err.statusCode === 404) {
        throw err;
      }
      throw new DatabaseError(err.message);
    }
  }
}
