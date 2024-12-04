import tf from '@tensorflow/tfjs-node';
import { cucumberModel, grapeModel, tomatoModel } from '..';

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
            prediction = cucumberModel.predict(tensor) as tf.Tensor;
        } else if (plantIndex === 1) { // grape
            prediction = grapeModel.predict(tensor) as tf.Tensor;
        } else if (plantIndex === 2) { // tomato
            prediction = tomatoModel.predict(tensor) as tf.Tensor;
        }

        const predictionData = await prediction?.data() as Float32Array;
        const confidenceScore = Number((Math.max(...predictionData) * 100).toFixed(1));
        const diseaseIndex = predictionData.reduce((maxIndex, current, index, arr) =>
            current > arr[maxIndex] ? index : maxIndex, 0);

        tensor.dispose();
        prediction?.dispose();

        return {
            confidenceScore: confidenceScore,
            diseaseIndex: diseaseIndex
        }
    }
}