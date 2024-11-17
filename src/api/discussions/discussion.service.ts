import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class DiscussionService {
  constructor() {}

  async create() {
    return "create discussion";
  }

  async getOne() {
    return "getOne discussion";
  }

  async getMany() {
    return "getMany discussion";
  }

  async update() {
    return "update discussion";
  }

  async delete() {
    return "delete discussion";
  }
}
