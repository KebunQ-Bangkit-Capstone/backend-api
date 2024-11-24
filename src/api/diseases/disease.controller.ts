import Elysia, { t } from "elysia";
import { DiseaseService } from "./disease.service";
import {
  DiseaseDTO,
  diseaseQuery,
  diseaseArrayResponse,
  updateDiseaseDTO,
  diseaseDTO,
  diseaseBody,
  diseaseResponse,
  DiseaseResponse,
} from "./disease.model";
import { generalResponse } from "../../models/response.model";
import { generalParams } from "../../models/params.model";
import { BucketService } from "../../services/bucket.service";
import { getFileExtension } from "../../utils/getFileExtension";

export const diseaseController = new Elysia({
  prefix: "/diseases",
  tags: ["Diseases"],
})
  .decorate("diseaseService", new DiseaseService())
  .decorate("bucketService", new BucketService())

  .post(
    "/",
    async ({ diseaseService, bucketService, body }) => {
      await diseaseService.create(body);
      return { message: "Disease created successfully." };
    },
    {
      response: generalResponse,
      body: diseaseBody,
      detail: { summary: "Create Disease" },
    }
  )

  .get(
    "/:id",
    async ({ diseaseService, bucketService, params: { id } }) => {
      const { image_id, ...rest } = await diseaseService.getOne(id);
      const url = await bucketService.getSignedUrl(image_id);

      return {
        ...rest,
        temporary_image_url: url,
      };
    },
    {
      params: generalParams,
      response: diseaseResponse,
      detail: { summary: "Get One Disease" },
    }
  )

  .get(
    "/",
    async ({ diseaseService, bucketService, query }) => {
      const { plant_index } = query;
      const plantIndex = Number(plant_index);

      const diseasesResponse: DiseaseResponse[] = [];

      const diseases = await diseaseService.getManyByPlantIndex(plantIndex);

      for (let i = 0; i < diseases.length; i++) {
        const { image_id, ...rest } = diseases[i];
        const url = await bucketService.getSignedUrl(image_id);

        const newDisease: DiseaseResponse = {
          ...rest,
          temporary_image_url: url,
        };

        diseasesResponse.push(newDisease);
      }

      console.log(diseases);

      return {
        diseases: diseasesResponse,
      };
    },
    {
      query: diseaseQuery,
      response: diseaseArrayResponse,
      detail: { summary: "Get Many Diseases by Plant Index" },
    }
  )

  .get(
    "/all",
    async ({ diseaseService, bucketService }) => {
      const diseasesResponse: DiseaseResponse[] = [];

      const diseases = await diseaseService.getMany();

      for (let i = 0; i < diseases.length; i++) {
        const { image_id, ...rest } = diseases[i];
        const url = await bucketService.getSignedUrl(image_id);

        const newDisease: DiseaseResponse = {
          ...rest,
          temporary_image_url: url,
        };

        diseasesResponse.push(newDisease);
      }

      return {
        diseases: diseasesResponse,
      };
    },
    {
      response: diseaseArrayResponse,
      detail: { summary: "Get All Diseases" },
    }
  )

  .patch(
    "/:id",
    async ({ diseaseService, params: { id }, body }) => {
      await diseaseService.update(id, body);
      return { message: "Disease updated successfully" };
    },
    {
      params: generalParams,
      body: updateDiseaseDTO,
      response: generalResponse,
      detail: { summary: "Update Disease" },
    }
  )

  .delete(
    "/:id",
    async ({ diseaseService, params: { id } }) => {
      await diseaseService.delete(id);
      return { message: "Disease deleted successfully" };
    },
    {
      params: generalParams,
      response: generalResponse,
      detail: { summary: "Delete Disease" },
    }
  );
