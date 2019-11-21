import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText
} from '@elastic/eui';

import TCNavbar from '../../components/navbar/navbar';

export class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/treatnet-console/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
  }

  render () {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <Router>
              <TCNavbar/>
            </Router>

            <EuiTitle size="l">
              <h1>
                {title} Hello World!
              </h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>
                    Congratulations
                </h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
                <h3>
                    You have successfully created your first Kibana Plugin!
                </h3>
                <p>
                    The server time (via API call) is {this.state.time || 'NO API CALL YET'}
                </p>
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
