import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CustomForm from '../components/Form'

class Field extends Component {

    state = {
        fields: []
    }

    componentWillReceiveProps(newProps) {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: newProps.token
        }
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                console.log("res", res);
                this.setState({ fields: res.data })
            })
    }

    render() {
        let data = [];
        if (this.state.fields) {
            let i = 0;
            while (this.state.fields[i]) {
                data.push(this.state.fields[i])
                i++;
            }
        }
        return (
            <div>
                <h2>Create </h2>
                <ol>
                    {data.map(data => {
                        return <li key={data.id}><a href={`/api/${data.id}`}>{data.title}</a></li>

                    })}
                </ol>
                <CustomForm reqType="post" FieldID={null} text="create" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Field);