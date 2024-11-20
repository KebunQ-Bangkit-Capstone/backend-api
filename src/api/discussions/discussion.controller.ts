import Elysia, { t } from "elysia";
import { DiscussionService } from "./discussion.service";
import {
    discussionBody,
    updateDiscussionDTO,
    DiscussionDTO,
    discussionDTO,
    discussionArrayResponse,
} from "./discussion.model";
import { generalResponse } from "../../models/response.model";
import { generalParams } from "../../models/params.model";

export const discussionController = new Elysia({
    prefix: "/discussions",
    tags: ['Discussions']
})
    .decorate("discussionService", new DiscussionService())

    .post("/", async ({ discussionService, body }) => {
        const date = new Date();
        date.setHours(date.getHours() + 7);

        const data: Omit<DiscussionDTO, "discussion_id"> = {
            ...body,
            created_at: date.toISOString().replace("Z", "+07:00"),
        };

        await discussionService.create(data);

        return {
            message: 'Discussion created successfully'
        };
    },
        {
            body: discussionBody,
            response: generalResponse,
            detail: {
                summary: 'Create Discussion',
            }
        }
    )

    .get("/:id", async ({ discussionService, params: { id } }) => {
        return await discussionService.getOne(id);
    }, {
        params: generalParams,
        response: discussionDTO,
        detail: {
            summary: 'Get One Discussion',
        }
    })

    .get("/", async ({ discussionService }) => {
        const discussions = await discussionService.getMany();

        return {
            discussions: [...discussions]
        };
    }, {
        response: discussionArrayResponse,
        detail: {
            summary: 'Get Many Discussion',
        }
    })

    .patch("/:id", async ({ discussionService, params: { id }, body }) => {
        await discussionService.update(id, body);

        return {
            message: 'Discussion updated successfully'
        };
    },
        {
            params: generalParams,
            body: updateDiscussionDTO,
            response: generalResponse,
            detail: {
                summary: 'Update Discussion',
            }
        }
    )

    .delete("/:id", async ({ discussionService, params: { id } }) => {
        await discussionService.delete(id);

        return {
            message: 'Discussion deleted successfully'
        };
    }, {
        params: generalParams,
        response: generalResponse,
        detail: {
            summary: 'Delete Discussion',
        }
    });
