import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Line } from 'recharts';
const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
const data = [{ title: 'jedzenie', kwota: 600, limit: 800 },
{ title: 'samochod', kwota: 400, limit: 350 },
{ title: 'mieszkanie', kwota: 1000, limit: 1020 },
{ title: 'chemia', kwota: 150, limit: 220 },
{ title: 'ubrania', kwota: 200, limit: 260 }];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
};

class LineBarChart extends Component {
    render() {
        return (
            <ComposedChart width={800} height={400} data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='limit' stroke='#e50000' />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="kwota" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))
                    }
                </Bar>
            </ComposedChart>
        );
    }
}

export default LineBarChart;