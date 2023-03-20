import * as yup from "yup";

export const commentsSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  text: yup.string().required(),
});
