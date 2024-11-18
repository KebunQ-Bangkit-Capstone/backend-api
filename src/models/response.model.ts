import { t } from "elysia";

export const generalResponse = t.Object({
    message: t.String({ description: 'Information about the status of the request' })
})