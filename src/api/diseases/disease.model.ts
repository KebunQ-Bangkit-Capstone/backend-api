import { t } from "elysia";

export const diseaseDTO = t.Object({
  disease_id: t.String(),
  plant_index: t.Number(),
  disease_index: t.Number(),
  description: t.String(),
  treatment: t.String(),
  analysis: t.String(),
  article: t.String(),
  image_id: t.String(),
});

export const updateDiseaseDTO = t.Object({
  plant_index: t.Optional(t.Number()),
  disease_index: t.Optional(t.Number()),
  description: t.Optional(t.String()),
  treatment: t.Optional(t.String()),
  analysis: t.Optional(t.String()),
  article: t.Optional(t.String()),
  image_id: t.String(),
});

export const diseaseBody = t.Object({
  disease_id: t.String(),
  plant_index: t.Number(),
  disease_index: t.Number(),
  description: t.String(),
  treatment: t.String(),
  analysis: t.String(),
  article: t.String(),
  image_id: t.String(),
});

export const diseaseResponse = t.Object({
  disease_id: t.String(),
  plant_index: t.Number(),
  disease_index: t.Number(),
  description: t.String(),
  treatment: t.String(),
  analysis: t.String(),
  article: t.String(),
  temporary_image_url: t.String(),
});

export const diseaseQuery = t.Object({
  plant_index: t.String(),
});

export const diseaseArrayResponse = t.Object({
  diseases: t.Array(diseaseResponse),
});

export type DiseaseDTO = typeof diseaseDTO.static;
export type UpdateDiseaseDTO = typeof updateDiseaseDTO.static;
export type DiseaseBody = typeof diseaseBody.static;
export type DiseaseResponse = typeof diseaseResponse.static;
