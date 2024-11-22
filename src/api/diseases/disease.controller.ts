import Elysia, { t } from "elysia";
import { DiseaseService } from "./disease.service";
import { diseaseDTO, DiseaseDTO, diseaseQuery, diseaseArrayResponse, updateDiseaseDTO } from "./disease.model";
import { generalResponse } from "../../models/response.model";
import { generalParams } from "../../models/params.model";

export const diseaseController = new Elysia({
    prefix: '/diseases',
    tags: ['Diseases']
})
    .decorate('diseaseService', new DiseaseService())

    .post('/', async ({ diseaseService, body }) => {
        const data: DiseaseDTO = { ...body };
        await diseaseService.create(data);
        return { message: 'Disease created successfully.' }
    }, {
        response: generalResponse,
        body: diseaseDTO,
        detail: { summary: 'Create Disease' }
    })

    .get('/:id', async ({ diseaseService, params: { id } }) => {
        return await diseaseService.getOne(id);
    }, {
        params: generalParams,
        response: diseaseDTO,
        detail: { summary: 'Get One Disease' }
    })

    .get('/', async ({ diseaseService, query }) => {
        const { plant_index } = query;
        const diseases = await diseaseService.getManyByPlantName(plant_index);
        return { diseases: [...diseases] };
    }, {
        query: diseaseQuery,
        response: diseaseArrayResponse,
        detail: { summary: 'Get Many Diseases' }
    })

    .patch('/:id', async ({ diseaseService, params: { id }, body }) => {
        await diseaseService.update(id, body);
        return { message: 'Disease updated successfully' }
    }, {
        params: generalParams,
        body: updateDiseaseDTO,
        response: generalResponse,
        detail: { summary: 'Update Disease' }
    })

    .delete('/:id', async ({ diseaseService, params: { id } }) => {
        await diseaseService.delete(id);
        return { message: 'Disease deleted successfully' }
    }, {
        params: generalParams,
        response: generalResponse,
        detail: { summary: 'Delete Disease' }
    })