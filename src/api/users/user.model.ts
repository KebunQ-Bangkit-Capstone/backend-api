import { t } from "elysia";

export const userDTO = t.Object({
    user_id: t.String(),
    email: t.String(),
    name: t.String(),
    created_at: t.String(),
});

export const userBody = t.Object({
    user_id: t.String({ description: 'User UID from firebase' }),
    email: t.String({ description: 'User email from firebase' }),
    name: t.String({ description: 'Name of the user' }),
});

export const updateUserDTO = t.Object({
    name: t.String({
        description: 'New name to update'
    }),
});

export const userParams = t.Object({
    id: t.String({ description: 'User UID from firebase' })
});

export type UserDTO = typeof userDTO.static;
export type UpdateUserDTO = typeof updateUserDTO.static;
export type UserBody = typeof userBody.static;