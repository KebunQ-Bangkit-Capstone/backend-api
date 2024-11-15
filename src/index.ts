import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { userController } from './controllers/user.controller';
import { analysisController } from './controllers/diseaseAnalysis.controller';
import { discussionController } from './controllers/discussion.controller';
import { commentController } from './controllers/comment.controller';
import { DatabaseError } from './utils/customError';

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
    .use(analysisController)
    .use(discussionController)
    .use(commentController)
    .listen(8000);

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`);