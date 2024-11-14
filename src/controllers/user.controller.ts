import Elysia, { error } from "elysia";
import { UserService } from "../services/user.service";
import { updateUserDTO, userBody, UserDTO } from "../models/user.model";
import { AppError } from "../utils/customError";

export const userController = new Elysia({ prefix: '/users' })
    .decorate('userService', new UserService())

    .post('/', async ({ userService, body }) => {
        const date = new Date();
        date.setHours(date.getHours() + 7);

        const data: UserDTO = {
            id: body.id,
            name: body.name,
            created_at: date.toISOString().replace('Z', '+07:00'),
        }

        await userService.create(data);

        return {
            status: 'success',
            message: 'user created successfully.'
        }
    }, { body: userBody })

    .get('/:id', async ({ userService, params: { id } }) => {
        const user = await userService.getOne(id);

        return {
            status: 'success',
            data: user
        }
    })

    .get('/', async ({ userService }) => {
        const users = await userService.getMany();

        return {
            status: 'success',
            data: users
        }
    })

    .patch('/:id', async ({ userService, params: { id }, body }) => {
        await userService.update(id, body);

        return {
            status: 'success',
            message: 'user updated successfully.'
        }
    }, { body: updateUserDTO })

    .delete('/:id', async ({ userService, params: { id } }) => {
        await userService.delete(id);

        return {
            status: 'success',
            message: 'user deleted successfully.'
        }
    })