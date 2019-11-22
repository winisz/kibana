import axios from 'axios';
import chrome from 'ui/chrome';

import { npStart } from 'ui/new_platform';

const { core } = npStart;

export const TNC_API_URL = core.injectedMetadata.getInjectedVar('treatnetConsoleApiUrl');

export const TreatnetConsoleAPI = axios.create({
  /* Tymczasowo, na razie endpointy pytają własnego serwera, docelowo serwera TNC */
  baseURL: chrome.addBasePath('/api/treatnet_console/')
});
