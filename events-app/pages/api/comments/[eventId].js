import { commentsSchema } from "../../../validations/CommentsValidation";
import { uri } from "../../../helpers/uri";
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(uri);

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    const userInput = {
      email,
      name,
      text,
    };
    const isValid = commentsSchema.isValid(userInput);
    if (!isValid) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const db = client.db("events");
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;

    res
      .status(201)
      .json({ message: "Added new comment.", comment: newComment });
  }
  if (req.method === "GET") {
    const db = client.db("events");
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ comments: documents });
  }

  client.close();
};

export default handler;
