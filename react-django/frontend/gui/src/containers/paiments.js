import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TablePaiments from '../components/table';
import FormPaiments from '../components/FormPaiments';
import axios from 'axios';
import ProgessCircle from '../components/ProgessCircle';

class Paiments extends Component {

    state = {}

    componentDidMount() {
        this.getPayments();
        axios.get('http://localhost:8000/api/user/')
            .then(res => {
                this.setState({ salary: res.data[0].salary })
            })
    }

    getPayments = () => {
        let sum = 0
        axios.get('http://localhost:8000/api/payments/').then(resp => {
            let dataParsed = resp.data.map(e => {
                if (new Date(e.date).getMonth() === new Date().getMonth()) {
                    sum += parseInt(e.price)
                }
                let element = e;
                element.categoryName = e.category.name;
                return element;
            })
            this.setState({ data: dataParsed, sum: sum })
        }
        )
    }

    delete = (selectedRowKeys, data) => {

        selectedRowKeys.forEach(element => {
            let id = data[element].id;
            axios.delete(`http://localhost:8000/api/payments/${id}/delete/`)
        })
        setTimeout(this.getPayments, 1000);
    }

    create = (title, price, date, category) => {
        axios.post(`http://localhost:8000/api/payments/create/`, {
            "title": title, "price": price, "date": date, "category": category
        })
            .then(res => {
                setTimeout(this.getPayments(), 1000);

            })
            .catch(er => console.error(er))
    }

    render() {
        //sumowac paymentsy dla miesiaca obecnego
        return (
            <div className="cont-paiments">
                <div className="add">
                    <FormPaiments create={this.create} data={this.state.data} />
                    <ProgessCircle salary={this.state.salary} sum={this.state.sum} />
                </div>
                <div className="table">
                    <TablePaiments data={this.state.data} delete={this.delete} />
                </div>
            </div>
        );
    }
}

export default Paiments;
