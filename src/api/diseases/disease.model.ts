import { t } from "elysia";

export const diseaseDTO = t.Object({
    disease_id: t.String(),
    plant_index: t.Number(),
    disease_index: t.Number(),
    description: t.String(),
    treatment: t.String(),
    analysis: t.String(),
    article: t.String(),
    image_id: t.String()
});

export const updateDiseaseDTO = t.Object({
    plant_index: t.Optional(t.Number()),
    disease_index: t.Optional(t.Number()),
    description: t.Optional(t.String()),
    treatment: t.Optional(t.String()),
    analysis: t.Optional(t.String()),
    article: t.Optional(t.String()),
    image: t.Optional(t.File({ type: 'image', maxSize: '1m', maxItems: 1 })),
});

export const diseaseBodyAndReponse = t.Object({
    disease_id: t.String(),
    plant_index: t.Number(),
    disease_index: t.Number(),
    description: t.String(),
    treatment: t.String(),
    analysis: t.String(),
    article: t.String(),
    image: t.File({ type: 'image', maxSize: '1m', maxItems: 1 }),
});

export const diseaseQuery = t.Object({
    plant_index: t.Number(),
});

export const diseaseArrayResponse = t.Object({ diseases: t.Array(diseaseBodyAndReponse) });

export type DiseaseDTO = typeof diseaseDTO.static;
export type UpdateDiseaseDTO = typeof updateDiseaseDTO.static;
export type DiseaseBodyAndReponse = typeof diseaseBodyAndReponse.static