import React, { PureComponent, Fragment } from 'react';
import { TreatnetConsoleAPI } from '../../services/treatnet_console_api';
import { TCDomainsTableDetails } from './table_details';

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
  EuiFieldNumber,
  EuiSpacer,
} from '@elastic/eui';
import { RIGHT_ALIGNMENT } from '@elastic/eui/lib/services';

class TCDomainsTable extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      pageOfItems: [],
      totalItemCount: -1,
      pageIndex: 0,
      pageSize: 20,
      sortField: 'address',
      sortDirection: 'asc',
      selectedItems: [],
      itemIdToExpandedRowMap: {},
    };
  }

  componentDidMount () {
    this.loadData();
  }

  loadData () {
    TreatnetConsoleAPI.sinkhole.patterns.list().then((resp) => {
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

  toggleDetails (item) {
    const itemIdToExpandedRowMap = { ...this.state.itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMap[item.id]) {
      delete itemIdToExpandedRowMap[item.id];
    } else {
      itemIdToExpandedRowMap[item.id] = (
        <TCDomainsTableDetails data={item}/>
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
        field: 'address',
        name: 'Address'
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
            <EuiText><h3>Sinkhole patterns definitions</h3></EuiText>
          </EuiTitle>
        </EuiPageContentHeader>
        <EuiPageContentBody>

          <EuiFlexGroup style={{ maxWidth: 600 }}>
            <EuiFlexItem>
              <EuiFormRow label="Address">
                <EuiFieldText />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFormRow label="Entry type">
                <EuiFieldText />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFormRow hasEmptyLabelSpace>
                <EuiButton>Search</EuiButton>
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

export default TCDomainsTable;
