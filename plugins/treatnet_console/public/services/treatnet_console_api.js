import axios from 'axios';
import chrome from 'ui/chrome';

import { npStart } from 'ui/new_platform';

const { core } = npStart;

export const TNC_API_URL = core.injectedMetadata.getInjectedVar('tncApiUrl');

export const KibanaPluginAPI = axios.create({
  baseURL: chrome.addBasePath('/')
});

const httpClient = axios.create({
  baseURL: TNC_API_URL
});

class BaseTreatnetConsoleAPI {
  constructor (httpClient) {
    this._http = httpClient;
    // TODO: tymczasowe rozwiazanie
    this._username = core.injectedMetadata.getInjectedVar('tncApiUsername');
    this._password = core.injectedMetadata.getInjectedVar('tncApiPassword');
  }

  _prepareHeaders () {
    const basicAuth = 'Basic ' + btoa(this._username + ':' + this._password);
    return { Authorization: basicAuth };
  }

  _get (url, params = {}) {
    return this._http.get(url, {
      params: params,
      headers: this._prepareHeaders()
    });
  }

  _post (url, data = {}) {
    return this._http.post(url, data, {
      headers: this._prepareHeaders()
    });
  }
}

class StixAPI extends BaseTreatnetConsoleAPI {
  get patterns () {
    return {
      list: () => this._get('stix/patterns/')
    };
  }
}

export const TreatnetConsoleAPI = {
  stix: new StixAPI(httpClient)
};
