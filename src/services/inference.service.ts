import tf from '@tensorflow/tfjs-node';
import { grapeModel, tomatoModel } from '..';

export class InferenceService {
    async predict(plantIndex: number, image: File) {
        const arrayBuffer = await image.arrayBuffer();
        const content = new Uint8Array(arrayBuffer);
        
        const tensor = tf.node
            .decodeJpeg(content)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        let prediction;

        if (plantIndex === 0) { // cucumber

        } else if (plantIndex === 1) { // grape
            prediction = grapeModel.predict(tensor) as tf.Tensor;
        } else if (plantIndex === 2) { // tomato
            prediction = tomatoModel.predict(tensor) as tf.Tensor;
        }

        const predictionData = await prediction?.data() as Float32Array;
        const confidenceScore = Math.max(...predictionData) * 100;
        const rankType = Number(prediction?.rankType);

        console.log(prediction);

        tensor.dispose();
        prediction?.dispose();

        return {
            confidenceScore: confidenceScore,
            diseaseIndex: rankType
        }
    }
}