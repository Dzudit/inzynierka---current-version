import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Spin } from 'antd';
import NavLink from 'react-router-dom/NavLink';
import * as actions from '../store/actions/auth';
import './style.css';

const FormItem = Form.Item;

/*function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}*/

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAuth(values.userName, values.password)
            }
        });
        this.props.history.push('/settings');
    }

    render() {

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                {errorMessage}
                {
                    this.props.loading ?
                        <Spin indicator={antIcon} /> :

                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Log in</Button>
                                Or
                                <NavLink style={{ marginLeft: '10px' }} to='/signup/' >
                                    signup
                                </NavLink>
                            </FormItem>
                        </Form>}
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
const mapSetToProps = state => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapSetToProps, mapDispatchToProps)(WrappedNormalLoginForm);