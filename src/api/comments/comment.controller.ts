import Elysia from "elysia";
import { CommentService } from "./comment.service";
import { commentBody, updateCommentDTO, CommentDTO } from "./comment.model";

export const commentController = new Elysia({ prefix: "/comments" })
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
      status: "success",
      message: "Comment created successfully.",
    };
  },
    { body: commentBody }
  )

  .get("/:id", async ({ commentService, params: { id } }) => {
    const comment = await commentService.getOne(id);

    return {
      status: "success",
      data: comment,
    };
  })

  .get("/", async ({ commentService }) => {
    const comments = await commentService.getMany();

    return {
      status: "success",
      data: comments,
    };
  })

  .patch("/:id", async ({ commentService, params: { id }, body }) => {
    await commentService.update(id, body);

    return {
      status: "success",
      message: "Comment updated successfully.",
    };
  },
    { body: updateCommentDTO }
  )

  .delete("/:id", async ({ commentService, params: { id } }) => {
    await commentService.delete(id);

    return {
      status: "success",
      message: "Comment deleted successfully.",
    };
  }
  );
