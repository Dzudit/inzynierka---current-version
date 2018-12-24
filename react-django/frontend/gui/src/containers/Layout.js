import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import './style.css';

const { Header, Content } = Layout;

class CustomLayout extends React.Component {
    render() {

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        {console.log("authenticated", this.props.isAuthenticated)}
                        {this.props.isAuthenticated ? <Menu.Item key="2"><Link to="/settings">User Settings</Link></Menu.Item> : <Menu.Item key="2"><Link to="/login">Log in</Link></Menu.Item>}
                        {true ? <Menu.Item key="1"><Link to="/categories">Planing</Link></Menu.Item> : null}
                        {/*this.props.isAuthenticated*/ true ? <Menu.Item key="3"><Link to="/paiments">Paiments</Link></Menu.Item> : null}
                        {/*this.props.isAuthenticated*/ true ? <Menu.Item key="4"><Link to="/charts">Statistics</Link></Menu.Item> : null}
                        {/*this.props.isAuthenticated*/ true ? <Menu.Item key="6" className="logout" onClick={this.props.logout}><Link to="/logout"> Log out </Link></Menu.Item> : null}
                    </Menu>const name = new type(arguments);
                </Header>
                <Content>
                    <div style={{ background: '#fff', padding: 4, minHeight: 280 }}>

                        {this.props.children}

                    </div>
                </Content>
            </Layout>);

    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
