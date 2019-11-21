import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import chrome from 'ui/chrome';

import TCDashboard from '../dashboard/dashboard';

const HOME_URL = `${chrome.addBasePath('/')}app/treatnet_console/`;

const routes = [
  {
    path: '/',
    component: TCDashboard
  },
  {
    path: '/subsite',
    component: TCDashboard
  }
];

export function getPath (path) {
  return HOME_URL + path;
}

export function RoutingSwitch () {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))});
    </Switch>
  );
}

/**
 *  A special wrapper for <Route> that knows how to handle "sub"-routes
 *  by passing them in a `routes` prop to the component it renders.
 */
function RouteWithSubRoutes (route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
