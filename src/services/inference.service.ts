import tf from '@tensorflow/tfjs-node';
import { cucumberModel, grapeModel, tomatoModel } from '..';

export class InferenceService {
    async predict(plantIndex: number, image: File) {
        // const arrayBuffer = await image.arrayBuffer();
        // const content = new Uint8Array(arrayBuffer);

        // const tensor = tf.node
        //     .decodeJpeg(content)
        //     .resizeNearestNeighbor([224, 224])
        //     .expandDims()
        //     .toFloat();

        // let prediction;

        // if (plantIndex === 0) { // cucumber
        //     prediction = cucumberModel.predict(tensor) as tf.Tensor;
        // } else if (plantIndex === 1) { // grape
        //     prediction = grapeModel.predict(tensor) as tf.Tensor;
        // } else if (plantIndex === 2) { // tomato
        //     prediction = tomatoModel.predict(tensor) as tf.Tensor;
        // }

        // const predictionData = await prediction?.data() as Float32Array;
        // const confidenceScore = Math.trunc(Math.max(...predictionData) * 100);
        // const diseaseIndex = predictionData.reduce((maxIndex, current, index, arr) =>
        //     current > arr[maxIndex] ? index : maxIndex, 0);

        // tensor.dispose();
        // prediction?.dispose();

        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch(`https://prediction-api-269618306064.us-central1.run.app/predict/${plantIndex}`, {
            method: 'POST',
            headers: {},
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error predicting image`);
        }

        const json = await response.json() as any;

        return {
            confidenceScore: Math.trunc(Number(json.confidence_score)),
            diseaseIndex: Number(json.class)
        }
    }
}