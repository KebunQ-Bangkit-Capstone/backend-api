import Elysia, { t } from "elysia";
import { DiseaseService } from "./disease.service";
import { DiseaseDTO, diseaseQuery, diseaseArrayResponse, updateDiseaseDTO, diseaseBodyAndReponse, DiseaseBodyAndReponse } from "./disease.model";
import { generalResponse } from "../../models/response.model";
import { generalParams } from "../../models/params.model";
import { BucketService } from "../../services/bucket.service";
import { getFileExtension } from "../../utils/getFileExtension";

export const diseaseController = new Elysia({
    prefix: '/diseases',
    tags: ['Diseases']
})
    .decorate('diseaseService', new DiseaseService())
    .decorate('bucketService', new BucketService())

    .post('/', async ({ diseaseService, bucketService, body }) => {
        const { disease_id, image } = body;

        const fileExtension = getFileExtension(image.name);
        const fileId = `image-disease-${disease_id}.${fileExtension}`;

        await bucketService.upload(image, fileId);

        const data: DiseaseDTO = {
            ...body,
            image_id: fileId
        };

        await diseaseService.create(data);
        return { message: 'Disease created successfully.' }
    }, {
        response: generalResponse,
        body: diseaseBodyAndReponse,
        detail: { summary: 'Create Disease' }
    })

    .get('/:id', async ({ diseaseService, bucketService, params: { id } }) => {
        const { image_id, ...rest } = await diseaseService.getOne(id);
        const image = await bucketService.download(image_id);

        return {
            ...rest,
            image: image
        };
    }, {
        params: generalParams,
        response: diseaseBodyAndReponse,
        detail: { summary: 'Get One Disease' }
    })

    .get('/', async ({ diseaseService, bucketService, query }) => {
        const { plant_index } = query;
        const diseases: DiseaseBodyAndReponse[] = [];

        (await diseaseService.getManyByPlantName(plant_index)).forEach(async (disease) => {
            const { image_id, ...rest } = disease;
            const image = await bucketService.download(image_id);

            const newDisease = {
                ...rest,
                image: image
            }

            diseases.push(newDisease);
        });

        return {
            diseases: diseases
        };
    }, {
        query: diseaseQuery,
        response: diseaseArrayResponse,
        detail: { summary: 'Get Many Diseases by Plant Name' }
    })

    .get('/all', async ({ diseaseService, bucketService }) => {
        const diseases: DiseaseBodyAndReponse[] = [];

        (await diseaseService.getMany()).forEach(async (disease) => {
            const { image_id, ...rest } = disease;
            const image = await bucketService.download(image_id);

            const newDisease = {
                ...rest,
                image: image
            }

            diseases.push(newDisease);
        });

        return {
            diseases: diseases
        };
    }, {
        response: diseaseArrayResponse,
        detail: { summary: 'Get All Diseases' }
    })

    .patch('/:id', async ({ diseaseService, bucketService, params: { id }, body }) => {
        const { image, ...rest } = body;

        if (image) {
            const fileExtension = getFileExtension(image.name);
            const fileId = `image-disease-${id}.${fileExtension}`;

            await bucketService.upload(image, fileId);
        }

        await diseaseService.update(id, rest);
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