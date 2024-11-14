import { t } from "elysia";

const diseaseAnalysisDTO = t.Object({
    id: t.String(),
    plant_name: t.String(),
    disease_name: t.String(),
    image_id: t.String(),
    user_id: t.String(),
    created_at: t.String()
});

export const DiseaseAnalysisDTO = diseaseAnalysisDTO.static;

export const diseaseAnalysisBody = t.Object({
    user_id: t.String(),
    image: t.File(),
});