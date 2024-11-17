import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { DatabaseError } from "./utils/customError";
import { discussionController } from "./api/discussions/discussion.controller";
import { userController } from "./api/users/user.controller";
import { commentController } from "./api/comments/comment.controller";
import { predictionController } from "./api/predictions/prediction.controller";
import { prisma } from "./setup";
import loadModel from "./utils/loadModel";

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .error({ DatabaseError })
    .onError(({ error, set }) => {
        set.headers["content-type"] = "application/json";

        if (error instanceof DatabaseError) {
            set.status = error.code;
            return {
                status: "fail",
                message: error.message,
            };
        }

        set.status = 500;
        return {
            status: "error",
            message: "An unexpected error occurred",
        }
    })
    .use(userController)
    .use(predictionController)
    .use(discussionController)
    .use(commentController)
    .listen(8000);

const model = await loadModel(); // temporary testing

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`);

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
