import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { TreatnetConsoleAPI } from '../../services/treatnet_console_api';

import {
  EuiText,
  EuiTitle,
  EuiButtonIcon,
  EuiBasicTable,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
  EuiFieldText,
  EuiSpacer,
} from '@elastic/eui';

import {getPath} from "../routing/routing";

class TCStixEdit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pattern: {
        name: 'test',
        collection: '',
        pattern_id: '',
        pattern: '',
        description: '',
        id: '',
        type: '',
      }
    };
    this.modifyText = this.modifyText.bind(this);
    this.save = this.save.bind(this);
  }

  modifyText(event) {
    let pattern = { ...this.state.pattern };
    try {
      pattern[event.target.name] = event.target.value;
    }
    catch (e) {
      if (e instanceof TypeError) {
        pattern.pattern_type = event;
      }
    }
    this.setState({pattern: pattern});
  }

  componentDidMount () {
    this.loadData();
  }

  loadData () {
    let path_elements = window.location.href.split('/');
    let pattern_id = path_elements[path_elements.length-1];
    TreatnetConsoleAPI.stix.pattern.retrieve(pattern_id).then((resp) => {
      this.setState({
        pattern: resp.data,
      });
    }).catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }

  save () {
    let data = {
      pattern: this.state.pattern.pattern,
      name: this.state.pattern.name,
      pattern_id: this.state.pattern.pattern_id,
      description: this.state.pattern.description,
      labels: this.state.pattern.labels,
      type: this.state.pattern.type,
      collection: this.state.pattern.collection,
    };
    TreatnetConsoleAPI.stix.pattern.update(this.state.pattern.id, data).then((resp) => {
      this.props.history.push(getPath('/stix'));
    }).catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  }

  render () {
    return (
      <Fragment>
        <EuiPageContentHeader>
          <EuiTitle>
            <EuiText><h3>Edit STIX pattern</h3></EuiText>
          </EuiTitle>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup style={{ maxWidth: 600 }} direction="column">
            <EuiFlexItem grow={true}>
              <EuiFormRow label="Name">
                <EuiFieldText name="name" value={this.state.pattern.name} onChange={this.modifyText}/>
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={true}>
              <EuiFormRow label="Pattern">
                <EuiFieldText name="pattern" value={this.state.pattern.pattern} onChange={this.modifyText}/>
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={true}>
              <EuiFormRow label="Pattern ID">
                <EuiFieldText name="pattern_id" value={this.state.pattern.pattern_id} onChange={this.modifyText}/>
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={true}>
              <EuiFormRow label="Description">
                <EuiFieldText name="description" value={this.state.pattern.description} onChange={this.modifyText}/>
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={true}>
              <EuiFormRow label="Type">
                <EuiFieldText name="type" value={this.state.pattern.type} onChange={this.modifyText}/>
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={true}>
              <EuiFormRow label="Collection">
                <EuiFieldText name="collection" value={this.state.pattern.collection} onChange={this.modifyText}/>
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={true}>
              <EuiFormRow>
                <EuiButton onClick={this.save}>Save</EuiButton>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
      </Fragment>
    )
  }
}


export default TCStixEdit;
