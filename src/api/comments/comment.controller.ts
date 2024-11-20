import Elysia from "elysia";
import { CommentService } from "./comment.service";
import { commentBody, updateCommentDTO, CommentDTO, commentDTO, commentArrayResponse } from "./comment.model";
import { generalResponse } from "../../models/response.model";
import { generalParams } from "../../models/params.model";

export const commentController = new Elysia({ prefix: "/comments", tags: ['Comments'] })
    .decorate("commentService", new CommentService())

    .post("/", async ({ commentService, body }) => {
        const date = new Date();
        date.setHours(date.getHours() + 7);

        const data: Omit<CommentDTO, "comment_id"> = {
            ...body,
            created_at: date.toISOString().replace("Z", "+07:00"),
        };

        await commentService.create(data);

        return {
            message: "Comment created successfully.",
        };
    }, {
        body: commentBody,
        response: generalResponse,
        detail: {
            summary: 'Create Comment',
        }
    }
    )

    .get("/:id", async ({ commentService, params: { id } }) => {
        return await commentService.getOne(id);
    }, {
        params: generalParams,
        response: commentDTO,
        detail: {
            summary: 'Get One Comment',
        }
    })

    .get("/", async ({ commentService }) => {
        const comments = await commentService.getMany();

        return {
            comments: [...comments]
        };
    }, {
        response: commentArrayResponse,
        detail: {
            summary: 'Get Many Comment',
        }
    })

    .patch("/:id", async ({ commentService, params: { id }, body }) => {
        await commentService.update(id, body);

        return {
            message: "Comment updated successfully.",
        };
    }, {
        params: generalParams,
        body: updateCommentDTO,
        response: generalResponse,
        detail: {
            summary: 'Update Comment',
        }
    }
    )

    .delete("/:id", async ({ commentService, params: { id } }) => {
        await commentService.delete(id);

        return {
            message: "Comment deleted successfully.",
        };
    }, {
        params: generalParams,
        response: generalResponse,
        detail: {
            summary: 'Delete Comment',
        }
    });
