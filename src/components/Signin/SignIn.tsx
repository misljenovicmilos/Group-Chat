import { auth } from "../../firebase";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as routes from "../../routes";
import "./SignIn.css";
interface State {
  email?: string;
  password?: string;
  history?: any;
  [key: string]: string | undefined;
}

export function SignIn() {
  let history = useHistory();
  const [error, seterror] = useState<string[]>();
  const [state, setState] = useState<State>({ email: "", password: "" });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!state.email || !state.password) {
      return;
    }
    auth
      .doSignInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        history.push(routes.MESSENGER);
      })
      .catch((err: any) => {
        seterror(err.message);
      });
  }

  return (
    <div className="container-signIn">
      <h1 className="h1">Group Chat</h1>
      <div className="email-signIn">
        <p className="p">Email:</p>
        <input
          type="email"
          value={state.email}
          className="emailsignIn"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div className="password-signIn">
        <p className="p">Password:</p>
        <input
          type="password"
          className="passwordsignIn"
          value={state.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <div className="button-signIn">
        {error && <p className="error">{error}</p>}

        <button type="button" className="btn-signIn" onClick={handleClick}>
          Sign In
        </button>
      </div>
      <div className="tosignUp">
        <p>
          Don't have an account? <Link to={routes.SING_UP}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
