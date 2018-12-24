import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;


class FormCategory extends React.Component {

    handleFormSubmit = (event, reqType, fieldID) => {

        event.preventDefault();
        const amount = event.target.elements.amount.value;
        const name = event.target.elements.name.value;
        this.props.update();
        if (name && !isNaN(amount) && amount > 0 && this.state.select) {
            axios.post(`http://localhost:8000/api/category/create/`, {
                "name": name, "limit": amount, "type": this.state.select
            })
                .then(res => {
                    console.log("added", this.props);

                })
                .catch(er => console.error(er))
        }
    }
    handleSelectChange = (value) => {
        this.setState({ select: value });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={event => this.handleFormSubmit(event, this.props.reqType, this.props.fieldID)} >
                    <FormItem
                        label="category name"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input name="name" placeholder="Put title here" />
                    </FormItem>
                    <FormItem
                        label="Type" // to do, usunac to dla update, nie pozwolic uztkownikowi tego zmienic
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 5 }}
                    >
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: 'Please select your type!' }],
                        })(
                            <Select
                                placeholder="Select category"
                                onChange={this.handleSelectChange}
                            >
                                <Option value="payments">payments</Option>
                                <Option value="savings">savings</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="limit/goals" //to do w zaleznosci od kategori
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input name="amount" placeholder="Enter some content..." />
                    </FormItem>
                    <FormItem>
                        <div className="add-button"><Button type="primary" htmlType="submit">Add</Button></div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const WrappedApp = Form.create()(FormCategory);
export default WrappedApp;
