import { t } from "elysia";

export const predictionDTO = t.Object({
    prediction_id: t.String(),
    plant_index: t.Number(),
    disease_index: t.Number(),
    confidence_score: t.Number(),
    image_id: t.String(),
    user_id: t.String(),
    created_at: t.String()
});

export const predictionBody = t.Object({
    image: t.File({ type: 'image', maxSize: '1m', maxItems: 1 }),
});

export const predictionQuery = t.Object({
    user_id: t.String(),
});

export const predictionParams = t.Object({
    user_id: t.String(),
    plant_index: t.String()
});

export const predictionResponse = t.Object({
    prediction_id: t.String(),
    plant_index: t.Number(),
    disease_index: t.Number(),
    confidence_score: t.Number(),
    image_id: t.String(),
    user_id: t.String(),
    treatment: t.String(),
    analysis: t.String(),
    article: t.String(),
    created_at: t.String()
});

export const predictionArrayResponse = t.Object({ predictions: t.Array(predictionResponse) });

export type PredictionDTO = typeof predictionDTO.static;
export type PredictionResponse = typeof predictionResponse.static;