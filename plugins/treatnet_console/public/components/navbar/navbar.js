import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItemButton
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { getPath } from '../routing/routing';

const dashboardTitle = i18n.translate('tnc.navbar.dashboard-title', { defaultMessage: 'Dashboard' });
const stixTitle = i18n.translate('tnc.navbar.stix-title', { defaultMessage: 'STIX definitions' });
const exampleTitle = i18n.translate('tnc.navbar.example-title', { defaultMessage: 'Example content' });

class TCNavbar extends Component {
  constructor (props) {
    super(props);
    this.handlePathChange = this.handlePathChange.bind(this);
  }

  handlePathChange (path) {
    this.props.history.push(getPath(path));
  }

  render () {
    return (
      <Fragment>
        <EuiKeyPadMenu>

          <EuiKeyPadMenuItemButton
            label={dashboardTitle}
            onClick={() => this.handlePathChange('')}>
            <EuiIcon type="dashboardApp" size="l"/>
          </EuiKeyPadMenuItemButton>

          <EuiKeyPadMenuItemButton
            label={stixTitle}
            onClick={() => this.handlePathChange('stix')}>
            <EuiIcon type="securityAnalyticsApp" size="l"/>
          </EuiKeyPadMenuItemButton>

          <EuiKeyPadMenuItemButton
            label={exampleTitle}
            onClick={() => this.handlePathChange('some_other')}>
            <EuiIcon type="addDataApp" size="l"/>
          </EuiKeyPadMenuItemButton>

        </EuiKeyPadMenu>
      </Fragment>
    );
  }
}

export default withRouter(TCNavbar);
