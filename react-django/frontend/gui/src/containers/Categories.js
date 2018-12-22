import React, { Component } from 'react';
import 'antd/dist/antd.css';
import TableCategory from '../components/tableCategory';
import FormCategory from '../components/FormCategory';
import { Progress } from 'antd';

class Categories extends Component {

    render() {
        return (
            <div className="cont-paiments">
                <div className="add">
                    <FormCategory />
                    <div className="limitCat">You have 700PLN to plan, Salary 4500PLN</div>
                    <div className="categories-progres">
                        jedzenie<Progress percent={70} status="active" />
                        samochod<Progress percent={30} strokeColor="yellow" status="active" />
                        zdrowie<Progress percent={60} strokeColor="green" status="active" />
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
