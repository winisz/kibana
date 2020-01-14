const path = require('path');
const HapiReactViews = require('hapi-react-views');

export default function (server) {
  /* TODO: probably there won't be any route to Hapi server, since only React app and NSC API is needed */
  server.route({
    path: '/api/example',
    method: 'GET',
    handler (request, h) {
      return { time: (new Date()).toISOString() };
    }
  });

  /* register serving ReactJS templates */
  server.views({
    engines: {
      js: HapiReactViews
    },
    path: path.join(__dirname, '..', 'views'),
  });

  /* Custom 404 template for plugin */
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    const basePath = request.getBasePath();

    if (response.isBoom && response.output.statusCode === 404) { // catch 404 raised by Kibana base routes
      return h.view('404', {
        homeUrl: `${basePath}/app/treatnet_console`,
        uiPublicUrl: `${basePath}/ui`,
        nodeModulesUrl: `${basePath}/node_modules`,
      }).code(404);
    }
    return h.continue;
  });
}
