import { uri } from "./uri";
import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(uri);
  return client;
};

export const insertDocument = async (client, database, cluster, document) => {
  const db = client.db(database);
  const result = await db.collection(cluster).insertOne(document);
  return result;
};

export const getAllDocuments = async (
  client,
  database,
  collection,
  sortingMethod
) => {
  const db = client.db(database);
  const documents = await db
    .collection(collection)
    .find()
    .sort(sortingMethod)
    .toArray();
  return documents;
};

export const errorResponse = (response, message) => {
  response.status(500).json({ message });
};
