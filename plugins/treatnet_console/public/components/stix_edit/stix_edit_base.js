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
  EuiTextArea,
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalBody
} from '@elastic/eui';

class TCStixBase extends PureComponent {
  constructor(props) {
    super(props);

    this.modifyText = this.modifyText.bind(this);
    this.get_data = this.get_data.bind(this);
    this.verify_pattern = this.verify_pattern.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
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

  showModal () {
    this.setState({showModal: true});
  }

  closeModal () {
    this.setState({showModal: false});
  }

  get_data () {
    if (!this.state.patternOk) {
      this.setState({showModal: true});
      return false;
    }

    return {
      pattern: this.state.pattern.pattern,
      name: this.state.pattern.name,
      pattern_id: this.state.pattern.pattern_id,
      description: this.state.pattern.description,
      //labels: this.state.pattern.labels,
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
    let modal;
    if (this.state.showModal) {
      modal = (
        <EuiOverlayMask>
            <EuiModal onClose={this.closeModal}>
              <EuiModalHeader>
                Error
              </EuiModalHeader>
              <EuiModalBody>
                You can not save not valid pattern
              </EuiModalBody>
            </EuiModal>
          </EuiOverlayMask>
      )
    }

    return (
      <Fragment>
        <EuiPageContentHeader>
          <EuiTitle>
            <EuiText><h3>{this.state.name}</h3></EuiText>
          </EuiTitle>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup>
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
            <EuiFlexGroup direction="column">
              <EuiFlexItem>
                <EuiText>
                  <h3>Instrukcja definiowania wzorców STIX</h3>
                  <h5>Wzorce STIX mają postać [ <u>expression</u> ] gdzie <u>expression</u> może przyjmować następujące wartości:  </h5>
                  <ul>
                    <li><u>query</u></li>
                    <li><u>expression</u> AND <u>expression</u></li>
                    <li><u>expression</u> OR <u>expression</u></li>
                    <li>(<u>expression</u>)</li>
                  </ul>
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFlexGroup direction="row">
                  <EuiText>
                    <h5>Wartości <u>query</u> to: </h5>
                    <ul>
                      <li><u>field</u> <u>operator</u> <u>value</u></li>
                      <li>network-traffic:protocols IN <u>protocols</u></li>
                      <li>network-traffic:dst_port <u>operator</u> <u>port_value</u></li>
                    </ul>
                  </EuiText>
                  <EuiText>
                    <h5>Wartości <u>field</u> to: </h5>
                    <ul>
                      <li>domain-name:value</li>
                      <li>ipv4-addr:value</li>
                      <li>ipv6-addr:value</li>
                      <li>http_request-ext:request_method</li>
                      <li>http-request-ext:request_version</li>
                      <li>http-request-ext:request_value</li>
                      <li>url:value</li>
                      <li>network-traffic:dst_ref.type</li>
                      <li>network-traffic:dst_ref.value</li>
                    </ul>
                  </EuiText>
                  <EuiText>
                    <h5>Wartości <u>operator</u> to: </h5>
                    <ul>
                      <li>=</li>
                      <li>!=</li>
                      <li>&lt;</li>
                      <li>&lt;=</li>
                      <li>&gt;</li>
                      <li>&gt;=</li>
                      <li>in</li>
                    </ul>
                  </EuiText>
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText>
                  <h4>Przykładowe wzorce:</h4>
                  <ul>
                    <li>[domain-name:value = 'test.pl' and (network-traffic:dst_port = 1553 or network-traffic:dst_port = 1554)]</li>
                    <li>[ipv4-addr:value = '46.183.217.151/32' AND (network-traffic:dst_port = 53 AND network-traffic:protocols IN [udp,dns])]</li>
                  </ul>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexGroup>
          { modal }
        </EuiPageContentBody>
      </Fragment>
    )
  }
}


export default TCStixBase;
