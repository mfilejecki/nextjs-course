import { commentsSchema } from "../../../validations/CommentsValidation";

const handler = (req, res) => {
  const eventId = req.query.eventId;
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
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
};

export default handler;
