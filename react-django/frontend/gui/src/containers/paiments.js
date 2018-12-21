import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TablePaiments from '../components/table';
import FormPaiments from '../components/FormPaiments';
import { Progress } from 'antd';

class Paiments extends Component {

    render() {
        return (
            <div className="cont-paiments">
                <div className="add">
                    <FormPaiments />
                    <div className="progres">
                        <Progress type="circle" percent={75} />
                    </div>
                    <div className="limit">Limit: 400</div>
                </div>
                <div className="table">
                    <TablePaiments />
                </div>
            </div>
        );
    }
}

export default Paiments;
