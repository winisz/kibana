import React, { PureComponent, Fragment } from 'react';
import { TreatnetConsoleAPI } from '../../services/treatnet_console_api';

import {
  EuiText,
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
  EuiFieldText,
  EuiTextArea
} from '@elastic/eui';
import {getPath} from "../routing/routing";

class TCStixBase extends PureComponent {
  constructor(props) {
    super(props);

    this.modifyText = this.modifyText.bind(this);
    this.get_data = this.get_data.bind(this);
    this.verify_pattern = this.verify_pattern.bind(this);
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

  get_data () {
    if (!this.state.patternOk) {

    }
    return {
      pattern: this.state.pattern.pattern,
      name: this.state.pattern.name,
      pattern_id: this.state.pattern.pattern_id,
      description: this.state.pattern.description,
      labels: this.state.pattern.labels,
      type: this.state.pattern.type,
      collection: this.state.pattern.collection,
      is_manually_added: true,
    };
  }

  verify_pattern (event) {
    this.modifyText(event);
    TreatnetConsoleAPI.verify.pattern.verify(event.target.value).then((resp) => {
      this.setState({patternOk: true});
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === 409) {
          this.setState({patternOk: false});
        }
      }
    });
  }

  render () {
    let errors;
    if (!this.state.patternOk) {
      errors = ["This is not a valid pattern"];
    }

    return (
      <Fragment>
        <EuiPageContentHeader>
          <EuiTitle>
            <EuiText><h3>{this.state.name}</h3></EuiText>
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
              <EuiFormRow label="Pattern" error={errors} isInvalid={!this.state.patternOk}>
                <EuiTextArea name="pattern" value={this.state.pattern.pattern} onChange={this.verify_pattern}/>
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
              <EuiFormRow label="Labels">
                <EuiFieldText name="labels" value='' onChange={this.modifyText}/>
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


export default TCStixBase;
