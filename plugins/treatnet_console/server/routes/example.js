
export default function (server) {
  server.route({
    path: '/api/treatnet-console/example',
    method: 'GET',
    handler () {
      return { time: (new Date()).toISOString() };
    }
  });
}
