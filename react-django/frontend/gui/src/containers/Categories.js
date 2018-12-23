import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TableCategory from '../components/tableCategory';
import FormCategory from '../components/FormCategory';
import { Progress } from 'antd';
import axios from 'axios';

class Categories extends Component {

    state = {
        salary: 2000
    }
    getPercent = (limit, suma) => {
        return suma * 100 / limit;
    }

    componentWillMount() {
        axios.get('http://192.168.1.102:8000/api/user/')
            .then(res => {
                console.log("resp settings", res);
                this.setState({ salary: res.salary })
            })
        axios.get(`http://192.168.1.102:8000/api/payments/summary`, {
            month: "current"
        }).then(resp => {
            let sum = 0;
            resp.data.map(e => {
                return sum = e.limit
            })
            this.setState({ data: resp.data, toPlan: sum });
        })
    }

    render() {
        return (
            <div className="cont-paiments">
                <div className="add">
                    <FormCategory />
                    <div className="limitCat">You have 700PLN to plan, Salary {this.state.salary}PLN</div>
                    <div className="categories-progres">
                        jedzenie<Progress percent={70} status="active" />
                        samochod<Progress percent={30} strokeColor="yellow" status="active" />
                        zdrowie<Progress percent={this.getPercent(4000, 50)} strokeColor="green" status="active" />
                        konto niezaleznosci finansowej<Progress percent={40} status="exception" />
                    </div>
                </div>
                <div className="table">
                    <TableCategory data="categories" />
                </div>
            </div>
        );
    }
}

export default Categories;
