import { resolve } from 'path';
import { existsSync } from 'fs';

import { i18n } from '@kbn/i18n';

import initRoutes from './server/routes/routes';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    id: 'treatnet_console',
    name: 'treatnet_console',
    uiExports: {
      app: {
        title: 'Treatnet Console',
        description: 'Treatnet plugin for Kibana',
        main: 'plugins/treatnet_console/app',
      },
      hacks: [
        'plugins/treatnet_console/hack'
      ],
      styleSheetPaths: [resolve(__dirname, 'public/app.scss'), resolve(__dirname, 'public/app.css')].find(p => existsSync(p)),
      injectDefaultVars (server) {
        const config = server.config();
        return {
          treatnetConsoleEnabled: config.get('treatnet_console.enabled'),
          treatnetConsoleApiUrl: config.get('treatnet_console.api.url'),
        };
      },
    },

    config (Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        api: Joi.object({
          url: Joi.string().required()
        }),
      }).default();
    },

    init (server, options) { // eslint-disable-line no-unused-vars
      const xpackMainPlugin = server.plugins.xpack_main;
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

      // Add server routes and initialize the plugin here
      initRoutes(server);
    }
  });
}
