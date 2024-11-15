import Elysia from "elysia";
import { PredictionService } from ".";

export const predictionController = new Elysia({ prefix: '/predictions' })
    .decorate('predictionService', new PredictionService())
    .post('/', async ({ predictionService }) => await predictionService.create())
    .get('/:id', async ({ predictionService }) => await predictionService.getOne())
    .get('/', async ({ predictionService }) => await predictionService.getMany())
    .patch('/', async ({ predictionService }) => await predictionService.update())
    .delete('/', async ({ predictionService }) => await predictionService.delete())