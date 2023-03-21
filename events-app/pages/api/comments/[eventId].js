import { commentsSchema } from "../../../validations/CommentsValidation";
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
  errorResponse,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    errorResponse(res, "Connecting to the database failed!");
    return;
  }

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
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    let result;
    try {
      result = await insertDocument(client, "events", "comments", newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Added new comment.", comment: newComment });
    } catch (error) {
      errorResponse(res, "Inserting comment to the database failed!");
    }
  }
  if (req.method === "GET") {
    let documents;
    try {
      documents = await getAllDocuments(
        client,
        "events",
        "comments",
        {
          _id: -1,
        },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      errorResponse(res, "Getting comments from database failed!");
    }
  }
  client.close();
};

export default handler;
