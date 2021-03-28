import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { defaultValues, validationSchema } from "./formikConfig";
import { FormField } from "../FormField";
import { useState } from "react";

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    console.log("Siging Up : ", email, userName, password);
  };
  return (
    <div className="auth-form">
      <h1>Signup</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name={"userName"} label={"User Name"} />
            <FormField type={"email"} name={"email"} label={"Email"} />
            <FormField type={"password"} name={"password"} label={"Password"} />
            <FormField
              type={"password"}
              name={"verifyPassword"}
              label={"Verify Password"}
            />
            <div>
              Already have an account?{" "}
              <span
                className="auth-link"
                onClick={() => history.push("/login")}
              >
                Log In!
              </span>
            </div>
            <button type="submit" disabled={isSubmitting || !isValid}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
