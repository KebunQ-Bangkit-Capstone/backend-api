
export class InferenceService {
    async predict(plantName: string, image: File) {
        return {
            confidenceScore: 90,
            diseaseName: 'blight'
        }
    }
}