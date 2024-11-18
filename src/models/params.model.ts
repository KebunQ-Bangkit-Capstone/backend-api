import { t } from "elysia";

export const generalParams = t.Object({
    id: t.String({ description: 'Unique id of the data' })
});