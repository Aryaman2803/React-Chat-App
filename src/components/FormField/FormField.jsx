import { ErrorMessage, Field } from "formik";

export const FormField = ({ name, label, type = "text" }) => {
  return (
    <>
      <label>
        {label}
        <Field type={type} name={name} autoComplete="off" />
        <ErrorMessage className="error" component="div" name={name} />
      </label>
    </>
  );
};
