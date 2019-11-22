import React, { PureComponent, Fragment } from 'react';
import { TreatnetConsoleAPI, TNC_API_URL } from '../../services/treatnet_console_api';

import {
  EuiPageContentHeader,
  EuiPageContentBody,
} from '@elastic/eui';

class TCStixTable extends PureComponent {
  constructor (props) {
    console.log('test0');
    super(props);
    this.state = {};
    this.apiUrl = TNC_API_URL;
  }

  componentDidMount () {
    console.log('test1');
    TreatnetConsoleAPI.get('example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
  }

  componentWillMount () {
    console.log('test2');
  }

  render () {
    console.log('test3');
    return (
      <Fragment>
        <EuiPageContentHeader>Something!</EuiPageContentHeader>
        <EuiPageContentBody>
          <p>This is api url from config: {this.apiUrl}</p>
          {this.state.time || 'No call yet!'}
          <button onClick={() => { console.log('Clicked!'); }}>Log</button>
        </EuiPageContentBody>
      </Fragment>
    );
  }
}

export default TCStixTable;
