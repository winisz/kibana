import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import {
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentBody,
} from '@elastic/eui';

class TCDashboard extends PureComponent {
  render () {
    return (
      <Fragment>
        <EuiPageContentHeader>
          <EuiTitle>
            <h2>Dashboard</h2>
          </EuiTitle>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          Some dashboard stuff bla bla
        </EuiPageContentBody>
      </Fragment>
    );
  }
}

export default withRouter(TCDashboard);
