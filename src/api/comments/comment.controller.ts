import Elysia from "elysia";
import { CommentService } from "./comment.service";
import { commentBody, updateCommentDTO, CommentDTO } from "./comment.model";

export const commentController = new Elysia({ prefix: "/comments" })
  .decorate("commentService", new CommentService())

  .post(
    "/",
    async ({ commentService, body }) => {
      const date = new Date();
      date.setHours(date.getHours() + 7);

      const data: Omit<CommentDTO, "comment_id"> = {
        user_id: body.user_id,
        discussion_id: body.discussion_id,
        content: body.content,
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

  .get("/:comment_id", async ({ commentService, params: { comment_id } }) => {
    // Changed to comment_id
    const comment = await commentService.getOne(comment_id);

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

  .patch(
    "/:comment_id",
    async ({ commentService, params: { comment_id }, body }) => {
      // Changed to comment_id
      await commentService.update(comment_id, body);

      return {
        status: "success",
        message: "Comment updated successfully.",
      };
    },
    { body: updateCommentDTO }
  )

  .delete(
    "/:comment_id",
    async ({ commentService, params: { comment_id } }) => {
      // Changed to comment_id
      await commentService.delete(comment_id);

      return {
        status: "success",
        message: "Comment deleted successfully.",
      };
    }
  );
