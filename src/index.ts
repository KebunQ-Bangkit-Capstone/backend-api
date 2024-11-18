import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { DatabaseError } from "./utils/customError";
import { discussionController } from "./api/discussions/discussion.controller";
import { userController } from "./api/users/user.controller";
import { commentController } from "./api/comments/comment.controller";
import { predictionController } from "./api/predictions/prediction.controller";
import { prisma } from "./utils/prisma";

const app = new Elysia()
    .use(cors())
    .use(swagger({
        documentation: {
            tags: [
                { name: 'Users', description: 'Users endpoints' },
                { name: 'Predictions', description: 'Predictions endpoints' },
                { name: 'Discussions', description: 'Discussions endpoints' },
                { name: 'Comments', description: 'Comments endpoints' },
            ]
        }
    }))
    .error({ DatabaseError })
    .onError(({ error, set }) => {
        const responseStatus = error instanceof DatabaseError ? error.code : 500;
        const responseMessage = error.message ?? 'Unknown error occurred';

        set.headers["content-type"] = "application/json";
        set.status = responseStatus;

        return {
            message: responseMessage,
        }
    })
    .use(userController)
    .use(predictionController)
    .use(discussionController)
    .use(commentController)
    .listen(8000);

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
