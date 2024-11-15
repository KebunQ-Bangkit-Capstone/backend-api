import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { DatabaseError } from './utils/customError';
import { userController } from './api/users';
import { predictionController } from './api/predictions';
import { discussionController } from './api/discussions';
import { commentController } from './api/comments';

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .error({ DatabaseError })
    .onError(({ error, code, set }) => {
        set.headers['content-type'] = 'application/json';

        if (code === 'DatabaseError') {
            const { name, message, statusCode } = error;
            set.status = statusCode;
            return {
                status: 'fail',
                message: `${name}: ${message}`
            }
        }
    })
    .use(userController)
    .use(predictionController)
    .use(discussionController)
    .use(commentController)
    .listen(8000);

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`);