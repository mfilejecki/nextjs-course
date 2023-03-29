import * as yup from "yup";

export const contactSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  message: yup.string().required(),
});

export const sendContactData = async (contactDetails) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  const data = await response.json();
};
