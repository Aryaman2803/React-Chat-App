import { Formik, Form } from "formik";
import { defaultValues, validationSchema } from "./formikConfig";
import { FormField } from "../FormField/FormField";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const login = ({ email }) => {
    console.log("Loggin In", email);
  };
  return (
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />

            <div>
              Don't have an account?{" "}
              <span
                className="auth-link"
                onClick={() => history.push("/signup")}
              >
                Sign Up!
              </span>
            </div>
            <button type="submit" disabled={isSubmitting || !isValid}>
              Login
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
