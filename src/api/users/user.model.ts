import { t } from "elysia";

export const userDTO = t.Object({
    id: t.String(),
    name: t.String(),
    created_at: t.String(),
});

export const userBody = t.Object({
    id: t.String(),
    name: t.String(),
});

export const updateUserDTO = t.Object({
    name: t.String(),
});

export type UserDTO = typeof userDTO.static;
export type UpdateUserDTO = typeof updateUserDTO.static;
export type UserBody = typeof userBody.static;