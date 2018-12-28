
import React, { Component } from 'react';
import { Progress } from 'antd';
import './style.css';

class ProgressCircle extends Component {

    state = {
        salary: null,
        sum: null
    }

    ComponentWillMount() {
        console.log("mount", this.props);
    }
    componentWillReceiveProps(props) {
        this.setState({ salary: props.salary, sum: props.sum })
    }

    render() {
        return (
            <div>
                <div className="progres">
                    <Progress type="circle" percent={parseInt(this.state.sum * 100 / this.state.salary)} />
                </div>
                <div className="limit">Salary: {parseInt(this.state.salary)}PLN</div>
            </div>
        );
    }
}


export default ProgressCircle;