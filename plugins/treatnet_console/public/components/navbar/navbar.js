import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import {
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItemButton
} from '@elastic/eui';

import { RoutingSwitch, getPath } from '../routing/routing';

class TCNavbar extends PureComponent {
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
        <div>
          <EuiKeyPadMenu>

            <EuiKeyPadMenuItemButton
              label="Dashboard"
              onClick={() => this.handlePathChange('')}>
              <EuiIcon type="dashboardApp" size="l"/>
            </EuiKeyPadMenuItemButton>

            <EuiKeyPadMenuItemButton
              label="Subsite"
              onClick={() => this.handlePathChange('subsite')}>
              <EuiIcon type="dashboardApp" size="l"/>
            </EuiKeyPadMenuItemButton>

          </EuiKeyPadMenu>
        </div>
        <RoutingSwitch/>
      </Fragment>
    );
  }
}

export default withRouter(TCNavbar);
