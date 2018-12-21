import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

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

    render() {
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
                        label="limit"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input name="description" placeholder="Enter some content..." />
                    </FormItem>
                    <FormItem>
                        <div className="add-button"><Button type="primary" htmlType="submit">Add</Button></div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default FormCategory;
