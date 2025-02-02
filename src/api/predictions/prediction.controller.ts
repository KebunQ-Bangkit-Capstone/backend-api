import Elysia from "elysia";
import { PredictionService } from "./prediction.service";
import { DiseaseService } from "../diseases/disease.service";
import { generalParams } from "../../models/params.model";
import { predictionArrayResponse, predictionBody, predictionCreateQuery, PredictionDTO, predictionQuery, PredictionResponse, predictionResponse } from "./prediction.model";
import { InferenceService } from "../../services/inference.service";
import { BucketService } from "../../services/bucket.service";
import { getFileExtension } from "../../utils/getFileExtension";
import { v4 as uuidv4 } from 'uuid';

export const predictionController = new Elysia({
    prefix: '/predictions',
    tags: ['Predictions']
})
    .decorate('predictionService', new PredictionService())
    .decorate('diseaseService', new DiseaseService())
    .decorate('inferenceService', new InferenceService())
    .decorate('bucketService', new BucketService())

    .post('/predict', async ({
        predictionService,
        inferenceService,
        diseaseService,
        bucketService,
        body,
        query }) => {
        const { image } = body;
        const { plant_index, user_id } = query;

        const plantIndex = Number(plant_index);

        const { confidenceScore, diseaseIndex } = await inferenceService.predict(plantIndex, image);

        const predictionId = uuidv4();
        const fileExtension = getFileExtension(image.name);
        const fileId = `image-prediction-${predictionId}.${fileExtension}`;

        const date = new Date();
        date.setHours(date.getHours() + 7);
        const createdAt = date.toISOString().replace('Z', '+07:00');

        const {
            treatment,
            analysis,
            article,
            plant_name,
            disease_name } = await diseaseService.getOne(`${plant_index}_${diseaseIndex}`);

        const data: PredictionDTO = {
            prediction_id: predictionId,
            plant_index: plantIndex,
            plant_name: plant_name,
            disease_name: disease_name,
            user_id: user_id,
            disease_index: diseaseIndex,
            confidence_score: confidenceScore,
            image_id: fileId,
            created_at: createdAt,
        };

        await predictionService.create(data);
        await bucketService.upload(image, fileId);

        const url = await bucketService.getSignedUrl(fileId);

        return {
            prediction_id: predictionId,
            plant_index: plantIndex,
            disease_index: diseaseIndex,
            plant_name: plant_name,
            disease_name: disease_name,
            confidence_score: confidenceScore,
            user_id: user_id,
            treatment: treatment,
            analysis: analysis,
            article: article,
            created_at: createdAt,
            temporary_image_url: url
        };
    }, {
        query: predictionCreateQuery,
        body: predictionBody,
        response: predictionResponse,
        detail: { summary: 'Predict Image' }
    })

    .get('/:id', async ({ predictionService, diseaseService, bucketService, params: { id } }) => {
        const { image_id, ...prediction } = await predictionService.getOne(id);
        const { treatment, analysis, article } = await diseaseService.getOne(`${prediction.plant_index}_${prediction.disease_index}`);
        const url = await bucketService.getSignedUrl(image_id);

        return {
            ...prediction,
            treatment: treatment,
            analysis: analysis,
            article: article,
            temporary_image_url: url
        };
    }, {
        params: generalParams,
        response: predictionResponse,
        detail: { summary: 'Get One Predictions' }
    })

    .get('/', async ({ predictionService, diseaseService, bucketService, query }) => {
        const { user_id } = query;
        const diseases = await diseaseService.getMany();
        const predictionsResponse: PredictionResponse[] = [];

        const predictions = await predictionService.getManyByUserId(user_id);

        for (let i = 0; i < predictions.length; i++) {
            const { image_id, ...pred } = predictions[i];
            const disease = diseases.find((dis) => dis.plant_index === pred.plant_index && dis.disease_index === pred.disease_index);
            if (!disease) continue;

            const url = await bucketService.getSignedUrl(image_id);

            const newPrediction: PredictionResponse = {
                ...pred,
                treatment: disease.treatment,
                analysis: disease.analysis,
                article: disease.article,
                temporary_image_url: url
            };

            predictionsResponse.push(newPrediction);
        }

        return {
            predictions: predictionsResponse
        }
    }, {
        query: predictionQuery,
        response: predictionArrayResponse,
        detail: { summary: 'Get Many Predictions by User ID' }
    })

    // .patch('/:id', async ({ predictionService }) => {
    //     return await predictionService.update();
    // }, {
    //     params: generalParams,
    //     detail: { summary: 'Update Predictions' }
    // })

    .delete('/:id', async ({ predictionService, params: { id } }) => {
        return await predictionService.delete(id);
    }, {
        params: generalParams,
        detail: { summary: 'Delete Predictions' }
    })