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
    const dummyList = [
      {
        id: "c1",
        name: "max",
        text: "A first comment",
      },
      {
        id: "c2",
        name: "manuel",
        text: "A second comment",
      },
    ];
    res.status(200).json({ comments: dummyList });
  }

  client.close();
};

export default handler;
