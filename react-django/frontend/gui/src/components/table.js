import { Table, Button } from 'antd';
import React from 'react';

const columns = [{
    title: 'Data',
    dataIndex: 'date',
}, {
    title: 'Title',
    dataIndex: 'title',
}, {
    title: 'Price',
    dataIndex: 'price',
}, {
    title: 'Category',
    dataIndex: 'categoryName',
}];

class TablePaiments extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    delete = () => {
        this.props.delete(this.state.selectedRowKeys, this.state.data);
        this.start();
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    componentWillReceiveProps(props) {
        if (props.data) {
            this.setState({ data: props.data })
        }
    }

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={this.delete}
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        Delete
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default TablePaiments;