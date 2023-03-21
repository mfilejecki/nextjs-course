import { emailSchema } from "../../validations/NewsletterValidation";
import {
  connectDatabase,
  insertDocument,
  errorResponse,
} from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const isValid = await emailSchema.isValid({ email: userEmail });

    if (!isValid) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      errorResponse(res, "Connecting to the database failed!");
      return;
    }

    try {
      await insertDocument(client, "events", "newsletter", {
        email: userEmail,
      });
      client.close();
    } catch (error) {
      errorResponse(res, "Inserting data to the database failed!");
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
