import Elysia, { t } from "elysia";
import { UserService } from "./user.service";
import { updateUserDTO, userBody, userDTO, UserDTO } from "./user.model";
import { generalResponse } from "../../models/response.model";
import { userParams } from "../../models/params.model";

export const userController = new Elysia({
    prefix: '/users',
    tags: ['Users'],
})
    .decorate('userService', new UserService())

    .post('/', async ({ userService, body }) => {
        const date = new Date();
        date.setHours(date.getHours() + 7);

        const data: UserDTO = {
            ...body,
            created_at: date.toISOString().replace('Z', '+07:00'),
        }

        await userService.create(data);

        return {
            message: 'User created successfully'
        };
    }, {
        body: userBody,
        response: generalResponse,
        detail: {
            summary: 'Create User',
        }
    })

    .get('/:id', async ({ userService, params: { id } }) => {
        return await userService.getOne(id);
    }, {
        params: userParams,
        response: userDTO,
        detail: {
            summary: 'Get One User',
        }
    })

    .get('/', async ({ userService }) => {
        const users = await userService.getMany();
        return {
            users: [...users]
        }
    }, {
        response: t.Object({ users: t.Array(userDTO) }),
        detail: {
            summary: 'Get Many Users',
        }
    })

    .patch('/:id', async ({ userService, params: { id }, body }) => {
        await userService.update(id, body);

        return {
            message: 'User updated successfully'
        };
    }, {
        params: userParams,
        body: updateUserDTO,
        response: generalResponse,
        detail: {
            summary: 'Update User',
        }
    })

    .delete('/:id', async ({ userService, params: { id } }) => {
        await userService.delete(id);

        return {
            message: 'User deleted successfully'
        };
    }, {
        params: userParams,
        response: generalResponse,
        detail: {
            summary: 'Delete User',
        }
    })