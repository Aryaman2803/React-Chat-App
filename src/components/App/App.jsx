import { Login, Signup, Chat } from "../../components";
import { Switch, Route } from "react-router";
import { useAuth, useResolved } from "../../hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatProvider } from "../../context/ChatContext";
import  'semantic-ui-css/semantic.min.css'
export const App = () => {
  const history = useHistory(); // Allows to change the route
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser); // Passing authUser so to check all its values are either true or false

  useEffect(() => {
    //Redirect to Login form if we are not logged in || Redirect to Chat if logged in
    if (authResolved) {
      //* (!!)it flips it to a variable
      // If user exists return Chat component otherwise Login
      history.push(!!authUser ? "/" : "/login");
    }
  }, [authResolved, authUser, history]);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <>Loading...</>
  );
};
