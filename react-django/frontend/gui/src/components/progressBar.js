
import React, { Component } from 'react';
import { Progress } from 'antd';
import './style.css';

class ProgressBar extends Component {

    state = {
        salary: null
    }

    ComponentDidMount() {
        this.props.onTryAutoSignup();
    }
    getPercent = (limit, suma) => {
        return suma * 100 / limit;
    }

    componentWillReceiveProps(props) {
        this.setState({ salary: props.salary })
    }

    render() {
        return (
            <div>
                <div className="limitCat">You have 700PLN to plan, Salary {this.state.salary ? this.state.salary : 99}PLN</div>
                <div className="categories-progres">
                    jedzenie<Progress percent={70} status="active" />
                    samochod<Progress percent={30} strokeColor="yellow" status="active" />
                    zdrowie<Progress percent={this.getPercent(4000, 50)} strokeColor="green" status="active" />
                    konto niezaleznosci finansowej<Progress percent={40} status="exception" />
                </div>
            </div>
        );
    }
}


export default ProgressBar;