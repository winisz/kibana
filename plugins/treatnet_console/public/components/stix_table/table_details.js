import React, { PureComponent, Fragment } from 'react';
import { EuiDescriptionList } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { StixPattern } from '../../models';

export class TCStixTableDetails extends PureComponent {
  constructor (props) {
    super(props);
    this.pattern = new StixPattern(props.data);
  }

  render () {
    const listItems = [
      {
        title: i18n.translate('tnc.stix_table.details.name', { defaultMessage: 'Name' }),
        description: this.pattern.name || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.collection', { defaultMessage: 'Collection' }),
        description: this.pattern.collection || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.pattern_id', { defaultMessage: 'Pattern ID' }),
        description: this.pattern.pattern_id || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.pattern', { defaultMessage: 'Pattern' }),
        description: this.pattern.pattern || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.description', { defaultMessage: 'Description' }),
        description: this.pattern.description || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.labels', { defaultMessage: 'Labels' }),
        description: this.pattern.labels.join(', ') || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.type', { defaultMessage: 'Type' }),
        description: this.pattern.type || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.source_ref', { defaultMessage: 'Source ref' }),
        description: this.pattern.source_ref || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.target_ref', { defaultMessage: 'Target ref' }),
        description: this.pattern.target_ref || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.created', { defaultMessage: 'Created' }),
        description: this.pattern.created || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.import_date', { defaultMessage: 'Import date' }),
        description: this.pattern.import_date || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.modification_date', { defaultMessage: 'Modification date' }),
        description: this.pattern.modification_date || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.last_modification_date', { defaultMessage: 'Last modification date' }),
        description: this.pattern.last_modification_date || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.valid_from', { defaultMessage: 'Valid from' }),
        description: this.pattern.valid_from || '-',
      },
      {
        title: i18n.translate('tnc.stix_table.details.valid_until', { defaultMessage: 'Valid until' }),
        description: this.pattern.valid_until || '-',
      },
    ];
    return <EuiDescriptionList textStyle="reverse" listItems={listItems} />;
  }
}
