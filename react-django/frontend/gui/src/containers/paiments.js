import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TablePaiments from '../components/table';
import FormPaiments from '../components/FormPaiments';
import { Progress } from 'antd';

class Paiments extends Component {

    state = {}

    componentDidMount() {
        this.setState({ update: "true" })
    }

    update = () => {
        this.setState({ update: "true" })
    }

    render() {
        //sumowac paymentsy dla miesiaca obecnego
        return (
            <div className="cont-paiments">
                <div className="add">
                    <FormPaiments />
                    <div className="progres">
                        <Progress type="circle" percent={75} />
                    </div>
                    <div className="limit">Salary: 4000</div>
                </div>
                <div className="table">
                    <TablePaiments update={this.state.update} />
                </div>
            </div>
        );
    }
}

export default Paiments;
