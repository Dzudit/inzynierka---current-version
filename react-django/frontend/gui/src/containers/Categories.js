import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TableCategory from '../components/tableCategory';
import FormCategory from '../components/FormCategory';
import axios from 'axios';
import ProgressBar from '../components/progressBar';

class Categories extends Component {

    state = {
        salary: 2000
    }

    componentWillMount() {
        axios.get('http://localhost:8000/api/user/')
            .then(res => {
                console.log("resp settings", res);
                this.setState({ salary: res.data[0].salary })
            })
        axios.get(`http://localhost:8000/api/payments/summary/`, {
            month: "current"
        }).then(resp => {
            let sum = 0;
            resp.data.map(e => {
                return sum = e.limit
            })
            this.setState({ data: resp.data, toPlan: sum });
        })
    }
    update = () => {
        console.log("update");
        this.setState({ update: "true" })
    }

    render() {
        return (
            <div className="cont-paiments">
                <div className="add">
                    <FormCategory update={this.update} />
                    <ProgressBar salary={this.state.salary} />
                </div>
                <div className="table">
                    <TableCategory update={this.state.update} />
                </div>
            </div>
        );
    }
}

export default Categories;
