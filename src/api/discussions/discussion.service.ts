import { DiscussionDTO, UpdateDiscussionDTO } from "./discussion.model";
import { DatabaseError } from "../../utils/customError";
import { prisma } from "../../setup";

export class DiscussionService {
  constructor() { }

  async create(data: Omit<DiscussionDTO, "discussion_id">) {
    try {
      await prisma.discussions.create({
        data: { ...data },
      });
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }

  async getOne(id: string) {
    try {
      const discussion = await prisma.discussions.findUnique({
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
      return await prisma.discussions.findMany();
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }

  async update(id: string, newData: UpdateDiscussionDTO) {
    try {
      await this.getOne(id);
      await prisma.discussions.update({
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
      await prisma.discussions.delete({
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
