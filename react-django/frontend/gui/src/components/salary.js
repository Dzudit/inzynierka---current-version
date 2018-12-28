import React, { Component } from 'react';
import './style.css';

class Salary extends Component {
    state = {}

    componentWillReceiveProps(props) {
        this.setState({ salary: props.salary })
    }

    render() {
        return <div className="salary"> Your salary is: {this.state.salary} </div>
    }
}
export default Salary