import React, { PureComponent, Fragment } from 'react';

import {
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiLink, EuiIcon,
  EuiI18n
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { TNC_API_URL } from '../../services/treatnet_console_api';

class TCDashboard extends PureComponent {
  constructor (props) {
    super(props);
    this.apiUrl = TNC_API_URL;
  }

  render () {
    return (
      <Fragment>
        <EuiPageContentHeader>
          <EuiTitle>
            <h2>{i18n.translate('tnc.dashboard.title', { defaultMessage: 'Dashboard' })}</h2>
          </EuiTitle>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          TreatnetConsole API URL: <EuiLink href={this.apiUrl}>{this.apiUrl} <EuiIcon type="popout"/></EuiLink>
        </EuiPageContentBody>
      </Fragment>
    );
  }
}

export default TCDashboard;
