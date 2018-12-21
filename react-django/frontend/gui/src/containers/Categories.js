import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TablePaiments from '../components/table';
import FormCategory from '../components/FormCategory';
import { Progress } from 'antd';

class Categories extends Component {

    render() {
        return (
            <div className="cont-paiments">
                <div className="add">
                    <FormCategory />
                    <div className="categories-progres">
                        jedzenie<Progress percent={70} status="active" />
                        samochod<Progress percent={30} strokeColor="yellow" status="active" />
                        zdrowie<Progress percent={60} strokeColor="green" status="active" />
                        ubrania<Progress percent={100} status="exception" />
                    </div>
                    <div className="limitCat">Sum of limits: 700, Salary: 4500</div>
                </div>
                <div className="table">
                    <TablePaiments data="categories" />
                </div>
            </div>
        );
    }
}

export default Categories;
