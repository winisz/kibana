
export default function (server) {
  server.route({
    path: '/api/treatnet_console/example',
    method: 'GET',
    handler () {
      return { time: (new Date()).toISOString() };
    }
  });
}
