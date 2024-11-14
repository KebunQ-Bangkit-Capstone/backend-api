import Elysia from "elysia";
import { DiseaseAnalysisService } from "../services/diseaseAnalysis.service";

export const analysisController = new Elysia({ prefix: '/analysis' })
    .decorate('analysisService', new DiseaseAnalysisService())
    .post('/', async ({ analysisService }) => await analysisService.create())
    .get('/:id', async ({ analysisService }) => await analysisService.getOne())
    .get('/', async ({ analysisService }) => await analysisService.getMany())
    .patch('/', async ({ analysisService }) => await analysisService.update())
    .delete('/', async ({ analysisService }) => await analysisService.delete())