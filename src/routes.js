import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import ServerSentEvents from './pages/ServerSentEvents'
import Websocket from './pages/Websocket'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/sse" component={ServerSentEvents} exact />
      <Route path="/ws" component={Websocket} exact />
    </Switch>
  </BrowserRouter>
)

export default Routes