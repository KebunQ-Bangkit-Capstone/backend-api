import Elysia from "elysia";
import { DiscussionService } from "./discussion.service";
import {
  discussionBody,
  updateDiscussionDTO,
  DiscussionDTO,
} from "./discussion.model";

export const discussionController = new Elysia({ prefix: "/discussions" })
  .decorate("discussionService", new DiscussionService())

  .post(
    "/",
    async ({ discussionService, body }) => {
      const date = new Date();
      date.setHours(date.getHours() + 7);

      const data: Omit<DiscussionDTO, "discussion_id"> = {
        user_id: body.user_id,
        content: body.content,
        image: body.image,
        created_at: date.toISOString().replace("Z", "+07:00"),
      };

      await discussionService.create(data);

      return {
        status: "success",
        message: "Discussion created successfully.",
      };
    },
    { body: discussionBody }
  )

  .get("/:id", async ({ discussionService, params: { id } }) => {
    const discussion = await discussionService.getOne(id);

    return {
      status: "success",
      data: discussion,
    };
  })

  .get("/", async ({ discussionService }) => {
    const discussions = await discussionService.getMany();

    return {
      status: "success",
      data: discussions,
    };
  })

  .patch(
    "/:id",
    async ({ discussionService, params: { id }, body }) => {
      await discussionService.update(id, body);

      return {
        status: "success",
        message: "Discussion updated successfully.",
      };
    },
    { body: updateDiscussionDTO }
  )

  .delete("/:id", async ({ discussionService, params: { id } }) => {
    await discussionService.delete(id);

    return {
      status: "success",
      message: "Discussion deleted successfully.",
    };
  });
