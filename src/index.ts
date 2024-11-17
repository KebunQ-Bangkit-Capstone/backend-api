import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { DatabaseError } from "./utils/customError";
import { discussionController } from "./api/discussions/discussion.controller";
import { PrismaClient } from "@prisma/client";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .decorate("prisma", prisma) // Menyediakan prisma client ke dalam konteks Elysia
  .error({ DatabaseError })
  .onError(({ error, set }) => {
    set.headers["content-type"] = "application/json";

    if (error instanceof DatabaseError) {
      set.status = error.statusCode;
      return {
        status: "fail",
        message: error.message,
      };
    } else {
      set.status = 500;
      return {
        status: "error",
        message: "An unexpected error occurred",
      };
    }
  })
  .use(discussionController)
  // Tambahkan controller lainnya jika ada
  .listen(8000);

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);

// Pastikan untuk menutup Prisma Client saat server berhenti
process.on("SIGINT", async () => {
  console.log("Closing Prisma Client");
  await prisma.$disconnect();
  process.exit();
});
process.on("SIGTERM", async () => {
  console.log("Closing Prisma Client");
  await prisma.$disconnect();
  process.exit();
});
