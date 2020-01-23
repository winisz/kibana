import React, { PureComponent, Fragment } from 'react';

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
} from '@elastic/eui';

class TCStixBase extends PureComponent {
  constructor(props) {
    super(props);

    this.modifyText = this.modifyText.bind(this);
    this.get_data = this.get_data.bind(this);
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

  render () {
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
              <EuiFormRow label="Labels">
                <EuiFieldText name="labels" value={this.state.pattern.labels} onChange={this.modifyText}/>
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
