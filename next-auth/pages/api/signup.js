import { hashPassword } from "../../lib/auth";
import { connectToDatabase } from "../../lib/db";

const handler = async (req, res) => {
  const { email, password } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    !password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should be at least 7 charakters long. ",
    });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const client = await connectToDatabase();
  const db = client.db();

  const result = await db
    .collection("users")
    .insertOne({ email, password: hashedPassword });

  res.status(201).json({ message: "Created user!" });
};

export default handler;
