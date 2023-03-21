import { emailSchema } from "../../validations/NewsletterValidation";
import { MongoClient } from "mongodb";
import { uri } from "../../helpers/uri";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const isValid = await emailSchema.isValid({ email: userEmail });

    if (!isValid) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(uri);
    const db = client.db("events");
    await db.collection("newsletter").insertOne({ email: userEmail });
    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
