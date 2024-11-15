import { t } from "elysia";

const predictionDTO = t.Object({
    id: t.String(),
    plant_name: t.String(),
    disease_name: t.String(),
    image_id: t.String(),
    user_id: t.String(),
    created_at: t.String()
});

export const PredictionDTO = predictionDTO.static;

export const predictionBody = t.Object({
    user_id: t.String(),
    image: t.File(),
});