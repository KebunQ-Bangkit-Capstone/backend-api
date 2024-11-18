import { t } from "elysia";

export const userParams = t.Object({
    id: t.String({ description: 'User UID from firebase' })
});

export const generalParams = t.Object({
    id: t.String({ description: 'Unique id of the data' })
});