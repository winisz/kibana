import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItemButton
} from '@elastic/eui';

import { getPath } from '../routing/routing';

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
            label="Dashboard"
            onClick={() => this.handlePathChange('')}>
            <EuiIcon type="dashboardApp" size="l"/>
          </EuiKeyPadMenuItemButton>

          <EuiKeyPadMenuItemButton
            label="STIX definitions"
            onClick={() => this.handlePathChange('stix')}>
            <EuiIcon type="securityAnalyticsApp" size="l"/>
          </EuiKeyPadMenuItemButton>

          <EuiKeyPadMenuItemButton
            label="Example component"
            onClick={() => this.handlePathChange('some_other')}>
            <EuiIcon type="addDataApp" size="l"/>
          </EuiKeyPadMenuItemButton>

        </EuiKeyPadMenu>
      </Fragment>
    );
  }
}

export default withRouter(TCNavbar);
