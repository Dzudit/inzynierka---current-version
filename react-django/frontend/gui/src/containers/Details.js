import React, { Component } from 'react';
import axios from 'axios';
import { Form, Card, Button } from 'antd';
import CustomForm from '../components/Form';

const FormItem = Form.Item;

class Details extends Component {

    state = {
        field: {}
    }

    componentDidMount() {
        const fieldID = this.props.match.params.fieldID;
        axios.get(`http://127.0.0.1:8000/api/${fieldID}/`)
            .then(res => {

                this.setState({ field: res.data })
            })
    }


    handleDelete = (event) => {
        const fieldID = this.props.match.params.fieldID;
        axios.delete(`http://127.0.0.1:8000/api/${fieldID}/`);
        this.props.history.push('/');
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Card title={this.state.field.title}>
                    {this.state.field.description}
                </Card>
                <CustomForm reqType="put" fieldID={this.props.match.params.fieldID} text="update" />
                <Form onSubmit={this.handleDelete}>
                    <FormItem>
                        <Button type="danger" htmlType="submit">Delete</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Details;