import React from 'react';
import { Route, Switch, BrowserRouter, NavLink } from 'react-router-dom';

import { Home } from './Home';
import { Update } from './Update';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/Update/:id/:name/:bucketId/:bucketname/:status"
          render={props => <Update {...props} />}
        />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
