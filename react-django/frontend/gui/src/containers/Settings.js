import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class Settings extends React.Component {

    state = {
        username: null
    }

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

    componentWillMount() {
        console.log("mount");
    }

    componentWillReceiveProps(newProps) {
        console.log("props", newProps);
        if (newProps.token) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: newProps.token
            }
            axios.get('http://127.0.0.1:8000/username/')
                .then(res => {
                    console.log("resp settings", res);
                    //this.setState({ username: res.data })
                })
        }
    }


    render() {
        return (
            <div>
                <div className="user"> {this.state.username} take control of your finances! </div>
                <div className="salary"> Your salary is: 4000 </div>
                <div className="settings">
                    <Form onSubmit={event => this.handleFormSubmit(event, this.props.reqType, this.props.fieldID)} >
                        <FormItem
                            label="change salary"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 5 }}
                        >
                            <Input name="title" placeholder="Put amout here" />
                        </FormItem>
                        <FormItem>
                            <div className="add-button-settings"><Button type="primary" htmlType="submit">Change</Button></div>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Settings);

