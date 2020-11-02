import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import * as routes from '../../routes';
import { useHistory } from 'react-router-dom';
import "./sigUp.css"
interface State {
  username?: string;
  email?: string;
  password1?: string; //?=>undifined
  password2?: string;
  [key: string]: string | undefined;
}
export function Signup() {
  const history = useHistory();
  const [state, setState] = useState<State>({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const [error, seterror] = useState<string[]>();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!state.email || !state.password1) {
      return;
    }
    auth
      .doCreateUserWithEmailAndPassword(state.email, state.password1)
      .then((authUser: firebase.auth.UserCredential) => {
        if (!authUser || !authUser.user || !state.username || !state.email) {
          return;
        }
        db.doCreateUser(authUser.user.uid, state.username, state.email);
        history.push(routes.MESSENGER);
      })

      .catch((err: any) => {
        seterror(err.message);
      });
  }
  let isInvalid =
    state.password1 !== state.password2 ||
    state.password1 === '' ||
    state.email === '' ||
    state.username === '';

  console.log('error', error);

  return (
    <div className="signUp-container">
      <h1 className="h1">Group Chat</h1>
      <div className="col-1">
        <p className="p">Username:</p>
        
      <input
        type="text"
        className="username"
        value={state.username}
        name="username"
        onChange={handleChange}
        placeholder="Username"
      /></div>
      <div className="col-2">
        <p className="p">Email:</p>
      <input
        type="email"
        className="email"
        value={state.email}
        name="email"
        onChange={handleChange}
        placeholder="Email"
      /></div>
      <div className="col-3">
        <p className="p">Password:</p>
      <input
        type="password"
        className="password1"
        value={state.password1}
        name="password1"
        onChange={handleChange}
        placeholder="Password"
      />
      </div>
      <div className="col-4">
        <p className="p">Confirm password:</p>
      <input
        type="password"
        className="password2"
        value={state.password2}
        name="password2"
        onChange={handleChange}
        placeholder="Confirm password"
      />
      </div>
      <div className="col-5">
      {error && <p className="error">{error}</p>}
      </div>
      <div className="col-6">
      <button type="button" className="btn-signUp" disabled={isInvalid} onClick={handleClick}>
        Sign Up
      </button>
      </div>
    </div>
  );
}
