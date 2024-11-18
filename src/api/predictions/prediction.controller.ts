import Elysia from "elysia";
import { PredictionService } from "./prediction.service";

export const predictionController = new Elysia({ prefix: '/predictions', tags: ['Predictions'] })
    .decorate('predictionService', new PredictionService())
    .post('/', async ({ predictionService }) => {
        return await predictionService.create();
    })
    .get('/:id', async ({ predictionService }) => {
        return await predictionService.getOne();
    })
    .get('/', async ({ predictionService }) => {
        return await predictionService.getMany();
    })
    .patch('/', async ({ predictionService }) => {
        return await predictionService.update();
    })
    .delete('/', async ({ predictionService }) => {
        return await predictionService.delete();
    })