import { contactSchema } from "../../lib/contact-form-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    const isValid = await contactSchema.isValid({ email, name, message });

    if (!isValid) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    // store in mongoDB
    const newMessage = {
      email,
      name,
      message,
    };
    console.log(newMessage);
    res
      .status(201)
      .json({ message: "Successfully stored message!", data: newMessage });
  }
};

export default handler;
