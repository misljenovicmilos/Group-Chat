import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from '../../routes';
import { Signin } from '..//Singin/Signin';
import { Signup } from '../Singup/Signup';
import { Messenger } from '../Messenger/messenger';


export function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact={true} path={routes.SING_UP} component={Signup} />
          <Route exact={true} path={routes.MESSENGER} component={Messenger} />
          <Route exact={true} path={routes.SING_IN} component={Signin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
