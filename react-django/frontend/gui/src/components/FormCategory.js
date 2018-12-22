import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;


class FormCategory extends React.Component {

    handleFormSubmit = (event, reqType, fieldID) => {
        event.preventDefault();
        const dupa = event.target.elements.title.value
        const dupa2 = event.target.elements.description.value;
        switch (reqType) {
            case 'post':
                return axios.post(`http://127.0.0.1:8000/api/`, {
                    title: dupa,
                    description: dupa2
                })
                    .then(res => console.log(res))
                    .catch(er => console.error(er))

            case 'put':
                return axios.put(`http://127.0.0.1:8000/api/${fieldID}/`, {
                    title: dupa,
                    description: dupa2
                })
                    .then(res => console.log(res))
                    .catch(er => console.error(er))
            default: return null
        }

    }
    handleSelectChange = (value) => {
        console.log(value);
        this.props.form.setFieldsValue({
            note: `Hi, ${value === 'jedzenie' ? 'man' : 'lady'}!`,
        });
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
                        <Input name="title" placeholder="Put title here" />
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
                                <Option value="male">paiments</Option>
                                <Option value="female">savings</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="limit/goals" //to do w zaleznosci od kategori
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input name="description" placeholder="Enter some content..." />
                    </FormItem>
                    <FormItem>
                        <div className="add-button"><Button type="primary" htmlType="submit">Add/update</Button></div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const WrappedApp = Form.create()(FormCategory);
export default WrappedApp;
