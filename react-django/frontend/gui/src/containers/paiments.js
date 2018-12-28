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
        axios.get('http://localhost:8000/api/payments/').then(resp => {
            let dataParsed = resp.data.map(e => {
                let element = e;
                element.categoryName = e.category.name;
                return element;
            })
            this.setState({ data: dataParsed })
        }
        )
    }

    delete = (selectedRowKeys, data) => {
        selectedRowKeys.forEach(element => {
            let id = data[element].id;
            axios.delete(`http://localhost:8000/api/payments/${id}/delete/`)
        })
        setTimeout(this.getPayments(), 1000);
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
                    <FormPaiments create={this.create} delete={this.delete} data={this.state.data} />
                    <ProgessCircle salary={this.state.salary} />
                </div>
                <div className="table">
                    <TablePaiments data={this.state.data} />
                </div>
            </div>
        );
    }
}

export default Paiments;
