import { t } from "elysia";

export const commentDTO = t.Object({
    comment_id: t.String(),
    user_id: t.String(),
    discussion_id: t.String(),
    content: t.String(),
    created_at: t.String(),
});

export const commentBody = t.Object({
    user_id: t.String(),
    discussion_id: t.String(),
    content: t.String(),
});

export const commentArrayResponse = t.Object({ comments: t.Array(commentDTO) });

export const updateCommentDTO = t.Object({
    content: t.String(),
});

export type CommentDTO = typeof commentDTO.static;
export type CommentBody = typeof commentBody.static;
export type UpdateCommentDTO = typeof updateCommentDTO.static;
