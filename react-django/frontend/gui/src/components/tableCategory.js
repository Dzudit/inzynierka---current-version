import { Table, Button } from 'antd';
import React from 'react';
import './style.css';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Type',
    dataIndex: 'type',
}, {
    title: 'Limit',
    dataIndex: 'limit',
}
];

class TableCategory extends React.Component {
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


    componentWillReceiveProps(props) {
        if (props.data) {
            let currentData = props.data.filter(e => { return e.deleted == false });
            this.setState({ data: currentData })
        }
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
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
                <div style={{ marginBottom: 16 }} className="button-table">
                    <Button
                        type="primary"
                        disabled={true}
                        loading={loading}
                    >
                        Update
                    </Button>
                </div>
                <div style={{ marginBottom: 16 }} >
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

export default TableCategory;