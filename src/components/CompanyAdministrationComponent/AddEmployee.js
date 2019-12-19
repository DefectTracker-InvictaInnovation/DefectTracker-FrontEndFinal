import { Modal, Button, Form, message, Input, Select, Row, Col, Upload, Icon, Mentions } from "antd";
import React from "react";
import axios from "axios";
import { LOGIN_API_BASE_URL, ACCESS_TOKEN } from '../../constants/index';

const { Option } = Select;
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);

const formValid = ({ formerrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formerrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
class AddEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastname: "",
      role: "HR",
      email: "",
      password: "",
      username: "",
      visible: false,
      formerrors: {
        firstname: "",
        lastname: "",
        email: "",
      },
    };

    this.handlechange = this.handlechange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  handlechange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "firstname":
        if (!NameRegex.test(value)) {
          formerrors.firstname = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.firstname = "Should be less than 30 characters";
        } else {
          formerrors.firstname = "";
        }
      case "lastname":
        if (!NameRegex.test(value)) {
          formerrors.lastname = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.lastname = "Should be less than 30 characters";
        } else {
          formerrors.lastname = "";
        }
        break;
      case "email":
        formerrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      default:
        break;
    }
    this.setState({ formerrors, [name]: value }, () => console.log(this.state));
  };

  onChangeDesignation(e) {
    this.setState({
      role: e.target.value
    });
    console.log(this.state.role);
  }
  onChangeName=(e)=> {
    this.setState({
      name: e.target.value
    });
    console.log(this.state.name);
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
    console.log(this.state.password);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
    console.log(this.state.username);
  }
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        message.success("Successfully Added!!!")
        this.setState({ visible: false });
      } else {
      }
    });
    if (formValid(this.state)) {

      const empJson = {
        name: this.state.name,
        lastname: this.state.lastname,
        username: this.state.username,
        email: this.state.email,
        role: this.state.role,
        password: this.state.password

      };
      this.setState({ empJson })
console.log(empJson)
      axios.post(LOGIN_API_BASE_URL + "/signup", empJson, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
        .then(res => {
          console.log(res.data);

          // this.props.reload();

        })

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }


  };


  onFileChangeHandler = (e) => {
    console.log(this.state)
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('file', e.target.files[i])

    }

    const data1 = {
      name: this.state.name,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role:this.state.role
    }
    console.log(JSON.stringify(data1))
    formData.append('extra', JSON.stringify(data1))
    console.log(formData)
    this.setState({ formData })

  };
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.setState({
      name: "null",
      lastname: "null",
      email: "null",
      username: "null",
      role: "null",
      password: "null",
      visible: false
    });
  };

  render() {
    const { formerrors } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button id="addHR" type="primary" onClick={this.showModal}>
          Add HR
        </Button>
        <Modal
          title="Add HR"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="550px"
        >
          <Form>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Firstname">
                  {getFieldDecorator("firstname", {
                    rules: [
                      {
                        required: true,
                        message: "Please input firstname!"
                      }
                    ]
                  })(
                    <Input
                      id="firstname"
                      className={
                        formerrors.firstname.length > 0 ? "error" : null
                      }
                      placeholder="Enter the firstname"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      name="firstname"
                      type="text"
                    />
                  )}
                  {formerrors.firstname.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.firstname}
                    </span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Surname">
                  {getFieldDecorator("lastname", {
                    rules: [
                      {
                        required: true,
                        message: "Please input surname!"
                      }
                    ]
                  })(
                    <Input
                      id="lastname"
                      className={
                        formerrors.lastname.length > 0 ? "error" : null
                      }
                      placeholder="Enter the lastname"
                      value={this.state.lastname}
                      onChange={this.handlechange}
                      name="lastname"
                      type="text"
                    />
                  )}
                  {formerrors.lastname.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.lastname}
                    </span>
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Username">
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: "Please input username!"
                      }
                    ]
                  })(
                    <Input
                      id="username"
                      placeholder="Enter the username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      name="username"
                      type="text"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Designation">
                {getFieldDecorator("role", {
                    rules: [
                      {
                        required: true,
                        message: "Please input role!"
                      }
                    ]
                  })(
                    <Input
                      // defaultValue="HR"
                      style={{ width: 100 }}
                      onChange={this.onChangeDesignation}
                      placeholder="HR"
                      // readOnly
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Email">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Please input email!"
                      }
                    ]
                  })(
                    <Input
                      id="email"
                      className={
                        formerrors.email.length > 0 ? "error" : null
                      }
                      placeholder="Enter the email"
                      value={this.state.email}
                      onChange={this.handlechange}
                      name="email"
                      type="text"
                    />
                  )}
                  {formerrors.email.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.email}
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item label="Password">
              {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input password!"
                      }
                    ]
                  })(
                <Input
                  id="password"
                  placeholder="Please enter password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  name="password"
                  type="text"
                />
                  )}
              </Form.Item>

            </Row>
          </Form>
        </Modal>
      </div>
    );
  }

  validateName = name => {
    if (name.length < 2) {
      return { validateStatus: "error", errorMsg: "Name is short." };
    }
  };
}

export default Form.create()(AddEmployee);