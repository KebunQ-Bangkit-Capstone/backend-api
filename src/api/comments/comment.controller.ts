import Elysia from "elysia";
import { CommentService } from ".";

export const commentController = new Elysia({ prefix: '/comments' })
    .decorate('commentService', new CommentService())
    .post('/', async ({ commentService }) => await commentService.create())
    .get('/:id', async ({ commentService }) => await commentService.getOne())
    .get('/', async ({ commentService }) => await commentService.getMany())
    .patch('/', async ({ commentService }) => await commentService.update())
    .delete('/', async ({ commentService }) => await commentService.delete())