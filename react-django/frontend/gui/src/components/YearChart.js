import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Legend } from 'recharts';
const data = [
    { month: 'Jen', salary: 4000, savings: 500, expenses: 3500 },
    { month: 'Fab', salary: 4000, savings: 0, expenses: 4300 },
    { month: 'March', salary: 4000, savings: 300, expenses: 3700 }
];

const renderCustomizedLabel = (props) => {
    const { x, y, width } = props;
    const radius = 10;

    return (
        <g>
            <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
            </text>
        </g>
    );
};
class PercentChart extends Component {
    render() {
        return (
            <BarChart width={800} height={400} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expenses" fill="#ed80a2" minPointSize={5}>
                    <LabelList dataKey="name" content={renderCustomizedLabel} />
                </Bar>
                <Bar dataKey="salary" fill="#80c8ed" minPointSize={10} />
                <Bar dataKey="savings" fill="#82ca9d" />
            </BarChart>
        );
    }
}

export default PercentChart;