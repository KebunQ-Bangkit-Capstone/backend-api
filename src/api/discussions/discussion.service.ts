import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DiscussionService {
  constructor() {}

  async create(data: { userId: string; content: string; image: string }) {
    try {
      const newDiscussion = await prisma.discussion.create({
        data: {
          user_id: data.userId,
          content: data.content,
          image: data.image,
          created_at: new Date(),
        },
      });
      return {
        status: 201,
        message: "Discussion created successfully",
        data: newDiscussion,
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      return {
        status: 500,
        message: "Failed to create discussion",
        error: errorMessage,
      };
    }
  }

  async getOne(id: string) {
    try {
      const discussion = await prisma.discussion.findUnique({
        where: { discussion_id: id },
        include: {
          user: true,
          comments: true,
        },
      });
      if (!discussion) {
        return {
          status: 404,
          message: "Discussion not found",
        };
      }
      return {
        status: 200,
        message: "Discussion retrieved successfully",
        data: discussion,
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      return {
        status: 500,
        message: "Error retrieving discussion",
        error: errorMessage,
      };
    }
  }

  async getMany() {
    try {
      const discussions = await prisma.discussion.findMany({
        include: {
          user: true,
          comments: true,
        },
      });
      return {
        status: 200,
        message: "Discussions retrieved successfully",
        data: discussions,
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      return {
        status: 500,
        message: "Error retrieving discussion",
        error: errorMessage,
      };
    }
  }

  async update(id: string, data: Partial<{ content: string; image: string }>) {
    try {
      const updatedDiscussion = await prisma.discussion.update({
        where: { discussion_id: id },
        data,
      });
      return {
        status: 200,
        message: "Discussion updated successfully",
        data: updatedDiscussion,
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      if ((error as any).code === "P2025") {
        return {
          status: 404,
          message: "Discussion not found",
        };
      }
      return {
        status: 500,
        message: "Failed to update discussion",
        error: errorMessage,
      };
    }
  }

  async delete(id: string) {
    try {
      await prisma.discussion.delete({
        where: { discussion_id: id },
      });
      return {
        status: 200,
        message: "Discussion deleted successfully",
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      if ((error as any).code === "P2025") {
        return {
          status: 404,
          message: "Discussion not found",
        };
      }
      return {
        status: 500,
        message: "Failed to delete discussion",
        error: errorMessage,
      };
    }
  }
}
