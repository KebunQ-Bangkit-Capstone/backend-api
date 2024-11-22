import tf from '@tensorflow/tfjs-node';
import { grapeModel, tomatoModel } from '..';

export class InferenceService {
    async predict(plantIndex: number, image: any) {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        let prediction;

        if (plantIndex === 0) { // cucumber
            
        } else if (plantIndex === 1) { // grape
            prediction = grapeModel.predict(tensor) as tf.Tensor<tf.Rank>;
        } else if (plantIndex === 2) { // tomato
            prediction = tomatoModel.predict(tensor) as tf.Tensor<tf.Rank>;
        }

        const predictionData = await prediction?.data() as Float32Array;
        const confidenceScore = Math.max(...predictionData) * 100;
        const rankType = Number(prediction?.rankType as string);

        return {
            confidenceScore: confidenceScore,
            diseaseIndex: rankType
        }
    }
}