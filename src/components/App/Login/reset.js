import React, { Component } from 'react';
import { Form, AutoComplete, Input, Select, Row, Col, Button } from 'antd';
import { LOGIN_API_BASE_URL, EXISTING_EMAIL,ACCESS_TOKEN } from './../../../constants/index'
import axios from "axios";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



class Reset extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: "",
      name: "",
      lastname: "",
      username: "",
      email: "",
      roles: [],
      Data: 'ghjn',
      id: ''

    }
    this.onChangeName = this.onChangeName.bind(this);
  }
  componentDidMount() {
    this.getuser();

  }

  getuser() {
    var _this = this;
    axios
      .get(LOGIN_API_BASE_URL + "/confirmreset/" + localStorage.getItem(EXISTING_EMAIL),{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(res => {
        // console.log( res.data);
        this.setState({ Data: res.data })
      });


    console.log("sssssssssss" + localStorage.getItem(EXISTING_EMAIL))
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    var _this = this;
    const Data = {
      id: this.state.Data.id,
      name: this.state.Data.name,
      lastname: this.state.Data.lastname,
      username: this.state.Data.username,
      email: this.state.Data.email,
      password: _this.state.password,
      roles: this.state.Data.roles

    }
    console.log(Data);

    axios
      .post(LOGIN_API_BASE_URL + "/resetpassword", Data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(res => {
        console.log(res.data)
        localStorage.removeItem(EXISTING_EMAIL)
      })

  };
  onChangeName=(e)=> {
    this.setState({
      
      password: e.target.value
    })
    
    };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };





  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 5,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (

      <Row gutter={24}>
        <Col span={24}>

          <br />
          <br />
          <br />
          <br />
          <Col span={8}></Col>
          <Col span={8}>
            <p> Please Enter Your New Password</p>
          </Col>

        </Col>

        <Col span={24}>
          <Col span={8}>
          </Col>
          <Col span={6}>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password 
                id="password"
                type="text"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangeName}/>)}

            </Form.Item>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
              Change Password
            </Button>
          </Col>
        </Col>
      </Row>
    );
  }
}
export default Form.create()(Reset);