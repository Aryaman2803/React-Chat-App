import { Formik, Form } from "formik";
import { defaultValues, validationSchema } from "./formikConfig";
import { FormField } from "../FormField/FormField";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { fb } from "../../service";
export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const login = ({ email, password }, { setSubmitting }) => {
    //Login to firebase and do some error handling
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) {
          setServerError(
            "We're having trouble logging you in. Please try again."
          );
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/wrong-password") {
          setServerError("Invalid credentials");
        } else if (err.code === "auth/user-not-found") {
          setServerError("No account for this email");
        } else {
          setServerError("Something went wrong");
        }
      })
      .finally(() => setSubmitting(false));
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

            <div className='auth-link-text'>
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
       <b>Username 1:</b> <em style={{marginRight:'2rem'}}>testuser@gmail.com</em> 
      <b>Password:</b> <em>testuser</em><br/>
      <b>Username 2:</b> <em style={{marginRight:'2rem'}}>qwerty@gmail.com</em> 
      <b>Password:</b> <em>12345678</em>
    </div>
  );
};
