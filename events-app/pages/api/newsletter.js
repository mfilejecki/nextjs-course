import { emailSchema } from "../../validations/NewsletterValidation";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const isValid = await emailSchema.isValid({ email: userEmail });

    if (!isValid) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
