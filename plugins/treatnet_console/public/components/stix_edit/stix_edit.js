import React, { PureComponent, Fragment } from 'react';
import { TreatnetConsoleAPI } from '../../services/treatnet_console_api';

import {getPath} from "../routing/routing";
import TCStixBase from "./stix_edit_base";

class TCStixEdit extends TCStixBase {
  constructor(props) {
    super(props);

    this.state = {
      pattern: {
        name: '',
        collection: '',
        pattern_id: '',
        pattern: '',
        description: '',
        id: '',
        type: '',
      },
      name: 'Edit STIX pattern',
      patternOk: true,
    };

    this.save = this.save.bind(this);
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
    let data = this.get_data();
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

}


export default TCStixEdit;
