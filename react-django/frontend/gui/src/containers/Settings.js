import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import Salary from '../components/salary';

const FormItem = Form.Item;

class Settings extends React.Component {

    state = {}

    handleFormSubmit = (event) => {
        event.preventDefault();
        const salary = event.target.elements.salary.value
        if (!isNaN(salary) && salary > 30) {
            axios.put(`http://localhost:8000/api/user/1/update/`, {
                salary: salary
            })
                .then(res => { this.setState({ salary: salary }) })
                .catch(er => console.error(er))
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8000/api/user/')
            .then(res => {
                this.setState({ salary: res.data[0].salary })
            })
    }

    render() {
        return (
            <div>
                <div className="user"> Take control of your finances! </div>
                <Salary salary={this.state.salary} />
                <div className="settings">
                    <Form onSubmit={event => this.handleFormSubmit(event, this.props.reqType, this.props.fieldID)} >
                        <FormItem
                            label="change salary"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 5 }}
                        >
                            <Input name="salary" placeholder="Put amout here" />
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

