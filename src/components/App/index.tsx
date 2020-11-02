import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "../../routes";
import { SignIn } from "../Signin/SignIn";
import { Signup } from "../Signup/SignUp";
import { Messenger } from "../Messenger/Messenger";
import { AppState } from "../../reducers";
import { useSelector } from "react-redux";
import SessionAccount from "../../actions/session";

export function App() {
  SessionAccount();
  const authUserIsSignIn = useSelector(
    (state: AppState) => state.sesionState.authUser
  );
  const userIsOnline = authUserIsSignIn.email;
  const userLog = userIsOnline !== undefined ? true : false;
  console.log("userLog", userLog);
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact={true} path={routes.SING_UP} component={Signup} />
          {userLog ? (
            <Route path={routes.MESSENGER} component={Messenger} />
          ) : (
            <Route path={routes.SING_IN} component={SignIn} />
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
}
