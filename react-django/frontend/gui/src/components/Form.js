import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class CustomForm extends React.Component {

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
                        label="Title">
                        <Input name="title" placeholder="Put title here" />
                    </FormItem>
                    <FormItem
                        label="Description">
                        <Input name="description" placeholder="Enter some content..." />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">{this.props.text}</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default CustomForm;
