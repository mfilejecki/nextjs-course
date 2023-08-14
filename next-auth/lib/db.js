import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://test123:test123@atlascluster.qgfm2d0.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
};
