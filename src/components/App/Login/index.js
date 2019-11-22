import React, { Component } from 'react'
import { Form, Input, Button, Icon, notification } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';
import { login } from './util/ApiUtil';
import {  ACCESS_TOKEN } from './../../../constants/index';
import {  ROLE_NAME } from './../../../constants/index';
import {   IS_AUTHENTICATED,CURRENT_USER } from './../../../constants/index';
import axios from "axios";
import { NavLink } from 'react-router-dom';
const FormItem = Form.Item;

class index extends Component{


  render(){
    const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin}  />
                </div>
            </div>
        );
  }
}
 class LoginForm extends Component {
   
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(event) {
    event.preventDefault();   
    this.props.form.validateFields((err, values) => {
        if (!err) {
            const loginRequest = Object.assign({}, values);
            console.log(loginRequest)
            login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                localStorage.setItem(ROLE_NAME,response.authorities[0].authority)
                localStorage.setItem(IS_AUTHENTICATED,response.authenticated)
                localStorage.setItem(CURRENT_USER,response.username)
                this.props.onLogin();
               
            }).catch(error => {
                if(error.status === 401) {
                    notification.error({
                        message: 'Defect Tracker',
                        description: 'Your Username or Password is incorrect. Please try again!'
                    });                    
                } else {
                    notification.error({
                        message: 'Defect Tracker',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });                                            
                }
            });
        }
    });
}

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-bg">
        <div className="logd">
           <h1 className="h1" style={{ fontFamily: 'fantasy,serif' }}>Defect Tracker</h1>
           <h2 className="h1">Login to your account</h2>
           <div className="login-card">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username or email!' }],
          })(
            <Input
              prefix={<Icon type="user" />}
              size="large"
              name="username"
              placeholder="Username or Email" 
              onChange={this.onChangeuser}
              />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              name="password"
              type="password"
              placeholder="Password" 
              onChange={this.onChangepass}/>
           )} 
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
          <a className="login-form-forgot" href="/forgot">
            Forgot password
          </a>
        </FormItem>
      </Form>
      </div>
      </div>
      </div>
    )
  }
}

export default index
