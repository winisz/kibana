import React, { PureComponent, Fragment } from 'react';
import { TreatnetConsoleAPI } from '../../services/treatnet_console_api';
import { TCStixTableDetails } from './table_details';

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
import { RIGHT_ALIGNMENT } from '@elastic/eui/lib/services';
import {getPath} from "../routing/routing";

class TCStixTable extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      pageOfItems: [],
      totalItemCount: -1,
      pageIndex: 0,
      pageSize: 20,
      sortField: 'name',
      sortDirection: 'asc',
      selectedItems: [],
      itemIdToExpandedRowMap: {},
      filters: {
        name: '',
        collection: '',
        pattern_id: '',
        pattern: '',
      }
    };
  }

  componentDidMount () {
    this.loadData();
  }

  loadData () {
    TreatnetConsoleAPI.stix.patterns.list().then((resp) => {
      this.setState({
        pageOfItems: resp.data.results,
        totalItemCount: resp.data.count,
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

  onTableChange ({ page = {}, sort = {} }) {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort;

    this.setState({
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    });
  };

  filterSTIX() {
    console.log('Is button working?');
  };

  editPattern(item) {
    this.props.history.push(getPath('stix/edit/' + item.id));
  }

  toggleDetails (item) {
    const itemIdToExpandedRowMap = { ...this.state.itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMap[item.id]) {
      delete itemIdToExpandedRowMap[item.id];
    } else {
      itemIdToExpandedRowMap[item.id] = (
        <TCStixTableDetails data={item}/>
      );
    }
    this.setState({ itemIdToExpandedRowMap });
  };

  render () {
    const {
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
      itemIdToExpandedRowMap,
    } = this.state;

    const columns = [
      {
        field: 'name',
        name: 'Name'
      },
      {
        field: 'collection',
        name: 'Collection'
      },
      {
        field: 'pattern_id',
        name: 'Pattern ID',
        truncateText: true,
      },
      {
        width: '60px',
        render: item => {
          if (item.is_manually_added === true) {
            return (
              <EuiButtonIcon
                onClick={() => this.editPattern(item)}
                aria-label="Edit"
                iconType="documentEdit"
              />
          )
          }
        }
      },
      {
        align: RIGHT_ALIGNMENT,
        width: '40px',
        isExpander: true,
        render: item => (
          <EuiButtonIcon
            onClick={() => this.toggleDetails(item)}
            aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
            iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
          />
        ),
      },

    ];

    const pagination = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalItemCount: this.state.totalItemCount,
      pageSizeOptions: [10, 20, 50],
    };

    const sorting = {
      sort: {
        field: sortField,
        direction: sortDirection,
      },
    };

    return (
      <Fragment>
        <EuiPageContentHeader>
          <EuiTitle>
            <EuiText><h3>STIX patterns definitions</h3></EuiText>
          </EuiTitle>
        </EuiPageContentHeader>
        <EuiPageContentBody>

          <EuiFlexGroup style={{ maxWidth: 600 }}>
            <EuiFlexItem>
              <EuiFormRow label="Name">
                <EuiFieldText />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Collection">
                <EuiFieldText />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Pattern ID">
                <EuiFieldText />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Pattern">
                <EuiFieldText />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton onClick={this.filterSTIX}>Search</EuiButton>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer/>

          <EuiBasicTable
            items={this.state.pageOfItems}
            itemId="id"
            itemIdToExpandedRowMap={this.state.itemIdToExpandedRowMap}
            isExpandable={true}
            hasActions={true}
            columns={columns}
            pagination={pagination}
            sorting={sorting}
            onChange={this.onTableChange}
          />
        </EuiPageContentBody>
      </Fragment>
    );
  }
}

export default TCStixTable;
