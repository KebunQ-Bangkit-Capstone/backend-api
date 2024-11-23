import { DatabaseError } from "../../utils/customError";
import { firestore } from "../../utils/firestore";
import { DiseaseDTO, UpdateDiseaseDTO } from "./disease.model";

export class DiseaseService {
    private collection;
    constructor() {
        this.collection = firestore.collection('Diseases');
    }

    async create(data: DiseaseDTO) {
        try {
            const { disease_id } = data;
            await this.collection.doc(disease_id).create(data);
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async getOne(id: string) {
        try {
            const doc = await this.collection.doc(id).get();

            if (!doc.exists) throw new DatabaseError('Disease not found', 404);

            return doc.data() as DiseaseDTO;
        } catch (err: any) {
            if (err.code === 404) {
                throw err;
            }
            throw new DatabaseError(err.message);
        }
    }

    async getManyByPlantName(plantIndex: number) {
        try {
            const snapshots = await this.collection.where('plant_index', '==', plantIndex).get();
            return snapshots.docs.map((doc) => ({ ...doc.data() })) as DiseaseDTO[];
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async getMany() {
        try {
            const snapshots = await this.collection.get();
            return snapshots.docs.map((doc) => ({ ...doc.data() })) as DiseaseDTO[];
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async update(id: string, newData: Omit<UpdateDiseaseDTO, 'image'>) {
        try {
            await this.collection.doc(id).update({ ...newData });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }

    async delete(id: string) {
        try {
            await this.collection.doc(id).delete({ exists: true });
        } catch (err: any) {
            throw new DatabaseError(err.message);
        }
    }
}