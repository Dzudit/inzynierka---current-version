import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './Charts.css';
import LineBarChart from '../components/LineBarChart';
import YearChart from '../components/YearChart';
import PercentChart from '../components/PieChart';

class Charts extends Component {
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
                            <YearChart />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Charts;