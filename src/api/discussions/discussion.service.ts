import { DiscussionDTO, UpdateDiscussionDTO } from "./discussion.model";
import { DatabaseError } from "../../utils/customError";
import { prisma } from "../../utils/prisma";

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
      return await prisma.discussions.findUniqueOrThrow({ where: { discussion_id: id } });
    } catch (err: any) {
      if (err.code === 'P2025') {
        throw new DatabaseError('Discussion not found', 404);
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
      await prisma.discussions.update({
        where: { discussion_id: id },
        data: { ...newData },
      });
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }

  async delete(id: string) {
    try {
      await prisma.discussions.delete({ where: { discussion_id: id } });
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  }
}
