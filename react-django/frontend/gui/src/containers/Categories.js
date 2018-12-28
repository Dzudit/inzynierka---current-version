import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TableCategory from '../components/tableCategory';
import FormCategory from '../components/FormCategory';
import axios from 'axios';
import ProgressBar from '../components/progressBar';
import { Row, Col } from 'antd';
import UpdatedCategory from '../components/UpdatedCategory';

class Categories extends Component {

    state = {}

    getSumOfLimits = (data) => {
        if (data) {
            let sum = 0
            data.filter(e => { return e.deleted == false }).map(e => {
                sum += parseInt(e.limit);
            });
            return sum;
        }
    }

    delete = (selectedRowKeys, data) => {
        selectedRowKeys.forEach(element => {
            let params = data[element];
            params.deleted = true;
            axios.put(`http://localhost:8000/api/category/${params.id}/delete/`, params)
        });
        setTimeout(this.getCategory, 1000);

    }

    componentWillMount() {
        this.getCategory()
        axios.get('http://localhost:8000/api/user/')
            .then(res => {
                this.setState({ salary: res.data[0].salary })
            })
    }

    getCategory = () => {
        axios.get('http://localhost:8000/api/category/').then(resp => {

            this.setState({ data: resp.data, sum: this.getSumOfLimits(resp.data) });
        })

        var d = new Date();
        var n = d.getMonth() + 1;
        axios.get(`http://localhost:8000/api/payments/summary/${n}/`).then(resp => {
            this.setState({
                progressdata: resp.data
            })
        })
    }

    create = (name, amount, type) => {
        axios.post(`http://localhost:8000/api/category/create/`, {
            "name": name, "limit": amount, "type": type
        }).then(res => {
            setTimeout(this.getCategory(), 1000);
        }
        )
            .catch(er => console.error(er))
    }

    render() {
        return (
            <div className="cont-paiments">
                <Row gutter={20}>
                    <Col md={24} lg={12} className="chartContainer">
                        <Row><Col lg={24}> <FormCategory create={this.create} /></Col> </Row>
                        <Row><Col lg={24}><ProgressBar salary={this.state.salary} sum={this.state.sum} progressdata={this.state.progressdata} /></Col> </Row>
                    </Col>
                    <Col md={24} lg={12} className="chartContainer">
                        <Row><Col lg={24}> <UpdatedCategory /></Col> </Row>
                        <Row><Col lg={24}> <TableCategory data={this.state.data} delete={this.delete} /></Col> </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Categories;
