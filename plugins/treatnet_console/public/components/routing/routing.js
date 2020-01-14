import React from 'react';
import {
  Switch,
  Route, Redirect
} from 'react-router-dom';
import chrome from 'ui/chrome';

import TCDashboard from '../dashboard/dashboard';
import TCStixTable from '../stix_table/stix_table';

export const BASE_URL = chrome.addBasePath('/');
export const HOME_URL = ''; // HashRouter doesn't require base server url

function ExampleComponent () {
  return <p>Example!</p>;
}

const routes = [
  {
    path: '/',
    exact: true,
    component: TCDashboard
  },
  {
    path: '/stix',
    exact: false,
    component: TCStixTable
  },
  {
    path: '/some_other',
    exact: false,
    component: ExampleComponent
  }
];

export function getPath (path) {
  return HOME_URL + path;
}

class RoutingSwitch extends React.Component {
  render () {
    return (
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))});
        <Route render={() => {
          window.location.replace(BASE_URL + '404');
          return null;
        }} />
      </Switch>
    );
  }
}

export default RoutingSwitch;

/**
 *  A special wrapper for <Route> that knows how to handle "sub"-routes
 *  by passing them in a `routes` prop to the component it renders.
 */
function RouteWithSubRoutes (route) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
