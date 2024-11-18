import Elysia from "elysia";
import { userController } from "./users/user.controller";
import { predictionController } from "./predictions/prediction.controller";
import { discussionController } from "./discussions/discussion.controller";
import { commentController } from "./comments/comment.controller";
import { diseaseController } from "./diseases/disease.controller";

export const controllers = new Elysia()
    .use(userController)
    .use(predictionController)
    .use(discussionController)
    .use(commentController)
    .use(diseaseController)