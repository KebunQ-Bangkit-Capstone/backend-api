import { t } from "elysia";

const commentDTO = t.Object({
    id: t.String(),
    user_id: t.String(),
    discussion_id: t.String(),
    content: t.String(),
    created_at: t.String(),
});

export const CommentDTO = commentDTO.static;