import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import {
  EuiPageContentHeader,
  EuiPageContentBody,
} from '@elastic/eui';

class TCStixTable extends Component {
  constructor (props) {
    console.log('test0');
    super(props);
    this.state = {};
  }

  componentDidMount () {
    console.log('test1');
    const { httpClient } = this.props;
    // httpClient.get('../api/treatnet_console/example').then((resp) => {
    //   this.setState({ time: resp.data.time });
    // });
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
          {this.state.time || 'No call yet!'}
          <button onClick={() => { console.log('Clicked!'); }}>Log</button>
        </EuiPageContentBody>
      </Fragment>
    );
  }
}

export default withRouter(TCStixTable);
