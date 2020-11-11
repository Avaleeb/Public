import { MongoClient } from 'mongodb';

const MONGODB_CONNECTION_STRING = 'mongodb+srv://favoriten_readwrite:op1EXfXwLTPCulHV@cluster0-uoazp.azure.mongodb.net/favoriten?retryWrites=true&w=majority&useUnifiedTopology=true';

let _client;

function isConnected() {
  return !!_client && !!_client.topology && _client.topology.isConnected();
}

const init = async () => {
  if (!isConnected()) {
    try {
      const client = await MongoClient.connect(MONGODB_CONNECTION_STRING, {
        poolSize: 20,
      });
      _client = client.db();
      console.log(`Database connected: ${MONGODB_CONNECTION_STRING}`);
    } catch (error) {
      console.error(`Error connecting to DB ${MONGODB_CONNECTION_STRING}`, error);
    }
  }
};

const client = () => _client;
const collections = () => (
  {
    newPotentialCustomer: _client.collection('newPotentialCustomer'),
    testCollection: _client.collection('test'),
    newPotentialPlace: _client.collection('newPotentialPlace'),
    cityCollection: _client.collection('city'),
    placeCollection: _client.collection('place'),
    newPotentialUpdate: _client.collection('newPotentialUpdate'),
  });

export { init, client, collections };
