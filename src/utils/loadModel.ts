import tf from '@tensorflow/tfjs-node';

export default async function loadModel() {
    const chiliModelUrl = 'https://storage.googleapis.com/riveleus-testing-model/chili-model/model.json';
    const asclepiusModelUrl = 'https://storage.googleapis.com/riveleus-testing-model/asclepius_model/model.json';
    return await tf.loadGraphModel(asclepiusModelUrl);
}