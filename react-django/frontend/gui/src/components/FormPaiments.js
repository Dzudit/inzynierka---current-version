import React from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;

class FormPaiments extends React.Component {

    state = {
        category: null,
        selectedCategory: null,
        SelectedDate: null
    }

    handleFormSubmit = (event, reqType, fieldID) => {
        event.preventDefault();
        const title = event.target.elements.title.value
        const price = event.target.elements.price.value
        if (this.state.selectedCategory && !isNaN(price) && price > 0 && this.state.SelectedDate) {
            this.props.create(title, price, this.state.SelectedDate, this.state.selectedCategory);
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/category/').then(resp =>
            this.setState({ category: resp.data })
        )
    }

    handleSelectChange = (value) => {
        console.log("selected", value);
        this.setState({ selectedCategory: value })
    }
    dataChange = (value, valueString) => {
        this.setState({ SelectedDate: valueString });
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={event => this.handleFormSubmit(event, this.props.reqType, this.props.fieldID)} >
                    <FormItem
                        {...formItemLayout}
                        label="DatePicker"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 18 }}
                    >
                        {getFieldDecorator('date-picker', config)(
                            <DatePicker onChange={this.dataChange} />
                        )}
                    </FormItem>
                    <FormItem
                        label="Category"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {this.state.category ? getFieldDecorator('category', {
                            rules: [{ required: true, message: 'Please select your gender!' }],
                        })(

                            < Select
                                placeholder="Select category"
                                onChange={this.handleSelectChange}
                            >
                                {this.state.category
                                    .filter(cat => { return cat.deleted == false })
                                    .map(cat => {
                                        return <Option value={cat.id}>{cat.name}</Option>
                                    })}
                            </Select>
                        ) : null}
                    </FormItem>
                    <FormItem
                        label="Title"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input name="title" placeholder="Put title here" />
                    </FormItem>
                    <FormItem
                        label="Price"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        <Input name="price" placeholder="Enter some content..." />
                    </FormItem>
                    <FormItem>
                        <div className="add-button"><Button type="primary" htmlType="submit">Add</Button></div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const WrappedApp = Form.create()(FormPaiments);
export default WrappedApp;