import * as yup from "yup";

export const defaultValues = {
  email: "",
  password: "",
  userName: "",
  verifyPassword: "",
};

export const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Must be at least 8 characters")
    .max(30),
  verifyPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  userName: yup
    .string()
    .required("Required")
    .matches(/^[a-zA-Z0-9]+$/, "No spaces")
    .min(4, "Must be at least 4 characters"),
});
