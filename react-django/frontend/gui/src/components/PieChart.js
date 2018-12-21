import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
const data = [{ name: 'jedzenie', value: 400 }, { name: 'chemia', value: 300 },
{ name: 'samochod', value: 300 }, { name: 'mieszkanie', value: 200 },
{ name: 'ubrania', value: 300 }, { name: 'wydatki nieregularne', value: 700 }];


const COLORS = ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

class YearChart extends Component {
    render() {
        return (
            <PieChart width={1300} height={400} onMouseEnter={this.onPieEnter}>
                <Tooltip />
                <Pie
                    data={data}
                    cx={300}
                    cy={200}
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                >
                    {
                        data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Legend layout='vertical' height={250} width={150} />
            </PieChart>
        );
    }
}

export default YearChart;
