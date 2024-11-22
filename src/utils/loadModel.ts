import tf from '@tensorflow/tfjs-node';

export default async function loadModel(url: string) {
    return await tf.loadLayersModel(url);
}