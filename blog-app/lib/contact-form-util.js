import * as yup from "yup";

export const contactSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  message: yup.string().required(),
});
