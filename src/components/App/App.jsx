import { Login, Signup, Chat } from "../../components";
import { Switch, Route } from "react-router";

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Chat} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
};
