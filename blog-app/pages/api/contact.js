import { contactSchema } from "../../lib/contact-form-util";
import { MongoClient } from "mongodb";

// import { uri } from "../../lib/uri";
const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.qgfm2d0.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    const isValid = await contactSchema.isValid({ email, name, message });

    if (!isValid) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db("blog");

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Storing message failed." });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", data: newMessage });
  }
};

export default handler;
