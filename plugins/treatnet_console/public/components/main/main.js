import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageBody,
  EuiPageContent,
  EuiTitle,
  EuiI18n,
} from '@elastic/eui';
import { HashRouter as Router } from 'react-router-dom';

import TCNavbar from '../../components/navbar/navbar';
import RoutingSwitch from '../routing/routing';

export class Main extends React.Component {
  render () {
    return (
      <Router>
        <EuiPage>
          <EuiPageBody>

            <EuiPageHeader>
              <EuiPageHeaderSection>
                <EuiTitle size="l">
                  <h1><EuiI18n
                    token="main.title"
                    default="Treatnet Console"
                  /></h1>
                </EuiTitle>
              </EuiPageHeaderSection>
              <EuiPageHeaderSection>
                <TCNavbar/>
              </EuiPageHeaderSection>
            </EuiPageHeader>

            <EuiPageContent>
              <RoutingSwitch/>
            </EuiPageContent>

          </EuiPageBody>
        </EuiPage>
      </Router>
    );
  }
}
