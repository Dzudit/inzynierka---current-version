import { Table, Button } from 'antd';
import React from 'react';
import UpdatedCategory from './UpdatedCategory';
import './style.css';
import axios from 'axios';

const columns = [{
    title: 'name',
    dataIndex: 'name',
}, {
    title: 'type',
    dataIndex: 'type',
}, {
    title: 'limit',
    dataIndex: 'limit',
}];

class TableCategory extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };

    start = () => {
        console.log("start");
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
        this.state.selectedRowKeys.forEach(element => {
            axios.put(`http://localhost:8000/api/category/${element}/delete`)
        });
        this.start();
    }

    componentWillReceiveProps(props) {
        axios.get('http://localhost:8000/api/category/').then(resp =>
            this.setState({ data: resp.data })
        )
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
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
                <UpdatedCategory />
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