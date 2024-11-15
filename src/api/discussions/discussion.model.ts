import { t } from "elysia";

const discussionDTO = t.Object({
    id: t.String(),
    user_id: t.String(),
    content: t.String(),
    image_id: t.String(),
    created_at: t.String()
});

export const DiscussionDTO = discussionDTO.static;