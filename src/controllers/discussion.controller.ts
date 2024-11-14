import Elysia from "elysia";
import { DiscussionService } from "../services/discussion.service";

export const discussionController = new Elysia({ prefix: '/discussions' })
    .decorate('discussionsService', new DiscussionService())
    .post('/', async ({ discussionsService }) => await discussionsService.create())
    .get('/:id', async ({ discussionsService }) => await discussionsService.getOne())
    .get('/', async ({ discussionsService }) => await discussionsService.getMany())
    .patch('/', async ({ discussionsService }) => await discussionsService.update())
    .delete('/', async ({ discussionsService }) => await discussionsService.delete())