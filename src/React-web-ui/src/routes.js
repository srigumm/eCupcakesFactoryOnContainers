import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './pages/landing';
import Mixer from './pages/mixer';
import Bake from "./pages/bake";
import Login from "./pages/login";
import Decorate from "./pages/decorate";
import Package from "./pages/package";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/mixer" component={Mixer} />
    <Route path="/baker" component={Bake} />
    <Route path="/decorator" component={Decorate} />
    <Route path="/packaging" component={Package} />
    <Route path="/dashboard" component={Landing} />
  </Switch>
);

export default Routes;
