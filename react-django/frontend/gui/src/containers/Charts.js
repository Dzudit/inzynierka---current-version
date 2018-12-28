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
    }

    render() {
        return (
            <div>
                <Row gutter={20}>
                    <Col span={12} className="chartContainer">
                        <div className="chartHeader"> Fields Statistic - current month</div>
                        <div>
                            <LineBarChart />
                        </div>
                    </Col>
                    <Col span={12} className="chartContainer">
                        <div className="chartHeader"> Fields Statistic - previous month</div>
                        <div>
                            <LineBarChart />
                        </div>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12} className="chartContainer">
                        <div className="chartHeader"> Percntage Fields Statistic - 12 months</div>
                        <div><PercentChart /></div>
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