import { t } from "elysia";

export const discussionDTO = t.Object({
  discussion_id: t.String(),
  user_id: t.String(),
  content: t.String(),
  image_id: t.Optional(t.String()),
  created_at: t.String(),
});

export const discussionBody = t.Object({
  user_id: t.String(),
  content: t.String(),
  image_id: t.Optional(t.String()),
});

export const updateDiscussionDTO = t.Object({
  content: t.Optional(t.String()),
  image_id: t.Optional(t.String()),
});

export type DiscussionDTO = typeof discussionDTO.static;
export type DiscussionBody = typeof discussionBody.static;
export type UpdateDiscussionDTO = typeof updateDiscussionDTO.static;
