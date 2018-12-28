import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './Charts.css';
import LineBarChart from '../components/LineBarChart';
import YearChart from '../components/YearChart';
import PercentChart from '../components/PieChart';
import axios from 'axios';

class Charts extends Component {

    state = {
    }

    componentWillMount() {
        axios.get(`http://localhost:8000/api/payments/summary/salary/`).then(resp => {
            this.setState({
                yearChart: resp.data.filter(e => {
                    return e.payments
                        || e.savings
                })
            });
        })
        axios.get(`http://localhost:8000/api/payments/summary/year/`).then(resp => {
            console.log("resp", resp.data)
            this.setState({
                pieChart: resp.data
            })
        });
        var d = new Date();
        var n = d.getMonth();
        axios.get(`http://localhost:8000/api/payments/summary/${n + 1}/`).then(resp => {
            this.setState({
                multiChart1: resp.data
            })
        });
        axios.get(`http://localhost:8000/api/payments/summary/${n}/`).then(resp => {
            this.setState({
                multiChart2: resp.data
            })
        });
    }

    render() {
        return (
            <div>
                <Row gutter={20}>
                    <Col span={12} className="chartContainer">
                        <div className="chartHeader"> Categories Statistic - current month</div>
                        <div>
                            <LineBarChart data={this.state.multiChart1} />
                        </div>
                    </Col>
                    <Col span={12} className="chartContainer">
                        <div className="chartHeader"> Categories Statistic - previous month</div>
                        <div>
                            <LineBarChart data={this.state.multiChart2} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12} className="chartContainer">
                        <div className="chartHeader"> Percntage Categorys Statistic - 12 months</div>
                        <div><PercentChart data={this.state.pieChart} /></div>
                    </Col>
                    <Col span={12} className="chartContainer">
                        <div className="chartHeader">Salary and Paiments Statistic - 12 months</div>
                        <div>
                            <YearChart data={this.state.yearChart} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Charts;