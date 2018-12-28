
import React, { Component } from 'react';
import { Progress } from 'antd';
import './style.css';

class ProgressBar extends Component {

    state = {
        salary: null,
        sum: null
    }

    getPercent = (limit, suma) => {
        return suma * 100 / limit;
    }

    componentWillReceiveProps(props) {
        this.setState({ salary: props.salary, sum: props.sum, progressdata: props.progressdata })
    }

    getProgress(limit, value) {
        let status = "active"
        let color = "green"
        if (value > limit) { status = "exception"; color = "red" }
        return <Progress percent={this.getPercent(limit, value)} strokeColor={color} status={status} />
    }

    render() {
        return (
            <div>
                <div className="limitCat">You have <spam className={this.state.salary - this.state.sum > 0 ? "green" : this.state.salary - this.state.sum ? "red" :
                    "grey"}>{this.state.salary - this.state.sum} </spam> to plan, Salary {parseInt(this.state.salary ? this.state.salary : 0)}PLN</div>
                <div>
                    <div className="categories-progres">
                        {this.state.progressdata ? this.state.progressdata.map(e => {
                            return <div>{e.name} {this.getProgress(e.limit, e.payments)}</div>
                        }) : null}
                    </div>
                </div>
            </div>
        );
    }
}


export default ProgressBar;