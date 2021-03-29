import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { defaultValues, validationSchema } from "./formikConfig";
import { FormField } from "../FormField";
import { useState } from "react";
import { fb } from "../../service";
import { Advertisement } from "semantic-ui-react";

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    //! (1) Create User in firebase Auth, when that succeeds
    //! (2) Call our [/api/createUser] function i.e. Folder api->createUser which will create the user in Chatengine.io
    //! (3) Then we create that user in Firestore

    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        //* (?.) means Optional chaining
        if (res?.user?.uid) {
          fetch("/api/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
          }).then(() => {
            //Chatenigne Api returns res.json thing which contains apiRes.data
            //But we don't access that. we create user in firestore

            fb.firestore
              .collection("chatUsers")
              .doc(res.user.uid)
              .set({ userName, avatar: "" });
          });
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again"
          );
        }
      })
      .catch((err) => {
        if (err === "auth/email-already-in-use") {
          setServerError("An account with this email already exists");
        } else {
          setServerError(
            "We're having trouble signing you up. Please try again"
          );
        }
      })
      .finally(() => setSubmitting(false));
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
