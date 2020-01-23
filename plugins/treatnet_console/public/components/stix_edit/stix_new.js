import { TreatnetConsoleAPI } from '../../services/treatnet_console_api';

import {getPath} from "../routing/routing";
import  TCStixBase  from "./stix_edit_base";

class TCStixNew extends TCStixBase {
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
      name: 'New STIX pattern'
    };

    this.save = this.save.bind(this);
  }

  loadData () {}

  save () {
    let data = this.get_data()
    TreatnetConsoleAPI.stix.pattern.post(data).then((resp) => {
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

export default TCStixNew;
