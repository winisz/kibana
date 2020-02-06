import React, { PureComponent, Fragment } from 'react';
import { EuiDescriptionList } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { SinkholePattern } from '../../models';

export class TCDomainsTableDetails extends PureComponent {
  constructor (props) {
    super(props);
    this.pattern = new SinkholePattern(props.data);
  }

  render () {
    const listItems = [
      {
        title: i18n.translate('tnc.patterns_table.details.address', { defaultMessage: 'Address' }),
        description: this.pattern.address || '-',
      },
      {
        title: i18n.translate('tnc.patterns_table.details.entry_type', { defaultMessage: 'Entry Type' }),
        description: this.pattern.entry_type || '-',
      },
      {
        title: i18n.translate('tnc.patterns_table.details.port', { defaultMessage: 'Port' }),
        description: this.pattern.port || '-',
      },
      {
        title: i18n.translate('tnc.patterns_table.details.method', { defaultMessage: 'Method' }),
        description: this.pattern.method || '-',
      },
      {
        title: i18n.translate('tnc.patterns_table.details.version', { defaultMessage: 'Version' }),
        description: this.pattern.version || '-',
      },
      {
        title: i18n.translate('tnc.patterns_table.details.path', { defaultMessage: 'Path' }),
        description: this.pattern.path || '-',
      },
      {
        title: i18n.translate('tnc.patterns_table.details.transport_protocol', { defaultMessage: 'Transport Protocol' }),
        description: this.pattern.transport_protocol || '-',
      },
      {
        title: i18n.translate('tnc.patterns_table.details.request_protocol', { defaultMessage: 'Request Protocol' }),
        description: this.pattern.request_protocol || '-',
      }
    ];
    return <EuiDescriptionList textStyle="reverse" listItems={listItems} />;
  }
}
