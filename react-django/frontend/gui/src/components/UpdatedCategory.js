import React from 'react';
import { Form, Input } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class UpdatedCategory extends React.Component {

    handleFormSubmit = (event, reqType, fieldID) => {
        event.preventDefault();
        let categoryID = 1;
        const amount = event.target.elements.amount.value;
        const name = event.target.elements.name.value;
        if (name && !isNaN(amount) && amount > 0) {
            axios.put(`http://192.168.1.102:8000/api/category/${categoryID}/update/`, {
                "name": name, "amount": amount
            })
                .then(res => { })
                .catch(er => console.error(er))
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={event => this.handleFormSubmit(event, this.props.reqType, this.props.fieldID)} >
                    <FormItem
                        label="category name"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input name="name" placeholder="Put title here" disabled={true} />
                    </FormItem>
                    <FormItem
                        label="limit/goals" //to do w zaleznosci od kategori
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input name="amount" placeholder="Enter some content..." disabled={true} />
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const WrappedApp = Form.create()(UpdatedCategory);
export default WrappedApp;
