import { resolve } from 'path';
import { existsSync } from 'fs';

import { i18n } from '@kbn/i18n';

import initRoutes from './server/routes/routes';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch', 'kibana', 'security'],
    id: 'treatnet_console',
    name: 'treatnet_console',
    uiExports: {
      app: {
        title: 'Treatnet Console',
        description: 'Treatnet plugin for Kibana',
        main: 'plugins/treatnet_console/app',
      },
      hacks: [
        'plugins/treatnet_console/hack',
        'plugins/treatnet_console/add_locale',
      ],
      styleSheetPaths: [resolve(__dirname, 'public/app.scss'), resolve(__dirname, 'public/app.css')].find(p => existsSync(p)),
      injectDefaultVars (server) {
        const config = server.config();
        return {
          tncEnabled: config.get('treatnet_console.enabled'),
          tncApiUrl: config.get('treatnet_console.api.url'),
          tncApiUsername: config.get('treatnet_console.api.username'),
          tncApiPassword: config.get('treatnet_console.api.password'),
        };
      },
    },

    config (Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        api: Joi.object({
          url: Joi.string().required(),
          username: Joi.string().required(),
          password: Joi.string().required()
        }),
      }).default();
    },

    init (server, options) { // eslint-disable-line no-unused-vars
      const xpackMainPlugin = server.plugins.xpack_main;
      const xpackSecurityPlugin = server.plugins.security;
      if (xpackMainPlugin) {
        const featureId = 'treatnet_console';

        xpackMainPlugin.registerFeature({
          id: featureId,
          name: i18n.translate('treatnetConsole.featureRegistry.featureName', {
            defaultMessage: 'treatnet-console',
          }),
          navLinkId: featureId,
          icon: 'questionInCircle',
          app: [featureId, 'kibana'],
          catalogue: [],
          privileges: {
            all: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
            read: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
          },
        });
      }
      if (xpackSecurityPlugin) {}
      // Intercept unauthenticated requests and redirect them to login page
      // server.ext('onRequest', function (request, h) {
      //   if (!request.auth.isAuthenticated) {
      //     return h.redirect('http://wp.pl')
      //       .code(301)
      //       .takeover();
      //   }
      //   return h.continue;
      // });

      // Add server routes and initialize the plugin here
      initRoutes(server);
    }
  });
}
