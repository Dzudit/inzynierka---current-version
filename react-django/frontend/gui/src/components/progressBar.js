
import React, { Component } from 'react';
import { Progress } from 'antd';
import './style.css';

class ProgressBar extends Component {

    state = {
        salary: null,
        sum: null
    }

    ComponentWillMount() {
        console.log("mount", this.props);
    }
    getPercent = (limit, suma) => {
        return suma * 100 / limit;
    }

    componentWillReceiveProps(props) {
        this.setState({ salary: props.salary, sum: props.sum })
    }

    render() {
        return (
            <div>
                <div className="limitCat">You have <spam className={this.state.salary - this.state.sum > 0 ? "green" : this.state.salary - this.state.sum ? "red" :
                    "grey"}>{this.state.salary - this.state.sum} </spam> to plan, Salary {parseInt(this.state.salary ? this.state.salary : 0)}PLN</div>
                <div>
                    <div className="categories-progres">

                        samochod<Progress percent={30} strokeColor="yellow" status="active" />
                        zdrowie<Progress percent={this.getPercent(4000, 50)} strokeColor="green" status="active" />
                        konto niezaleznosci finansowej<Progress percent={40} status="exception" />
                    </div>
                </div>
            </div>
        );
    }
}


export default ProgressBar;