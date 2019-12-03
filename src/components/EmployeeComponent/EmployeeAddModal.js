import { Modal, Button, Form, message, Input, Select, Row, Col, Upload, Icon } from "antd";
import React from "react";
import axios from "axios";
import { API_BASE_URL_EMP, ACCESS_TOKEN } from '../../constants/index';

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
class EmployeeAddModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeId: "",
      employeeName: "",
      employeeFirstName: "",
      employeeDesignation: "",
      employeeEmail: "",
      employeePicture: "",
      visible: false,
      formerrors: {
        employeeId: "",
        employeeName: "",
        employeeFirstName: "",
        employeeEmail: ""
      },
      designations: [],
      username: "",
      email: "",
      role: "",
      password: ""
    };

    this.handlechange = this.handlechange.bind(this);
    this.fetchDesignations = this.fetchDesignations.bind(this);
    this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount() {
    this.fetchDesignations();
    console.log("mounting");
  }



  fetchDesignations() {
    var _this = this;
    axios
      .get(API_BASE_URL_EMP + "/getAllDesignation", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response.data);
        _this.setState({ designations: response.data });
        console.log(_this.state.designations);
      });
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    console.log(this.state.employeeDesignation);
  }
  handlechange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "employeeId":
        if (!ValidRegex.test(value)) {
          formerrors.employeeId = "Invalid Id";
        } else if (value.length > 8) {
          formerrors.employeeId = "Should be less than 8 characters";
        } else if (value.length < 2) {
          formerrors.employeeId = "Should be greater than 2 characters";
        } else {
          formerrors.employeeId = "";
        }
        break;
      case "employeeName":
        if (!NameRegex.test(value)) {
          formerrors.employeeName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.employeeName = "Should be less than 30 characters";
        } else {
          formerrors.employeeName = "";
        }
      case "employeeFirstName":
        if (!NameRegex.test(value)) {
          formerrors.employeeFirstName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.employeeFirstName = "Should be less than 30 characters";
        } else {
          formerrors.employeeFirstName = "";
        }
        break;
      case "employeeEmail":
        formerrors.employeeEmail = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      default:
        break;
    }
    this.setState({ formerrors, [name]: value }, () => console.log(this.state));
  };

  handleOk = (e, empId) => {



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
      console.info(`
        --SUBMITTING--
        Employee Id: ${this.state.employeeId}
        Employee Name: ${this.state.employeeName}
        Employee FirstName:${this.state.employeeFirstName}
        Employee Email: ${this.state.employeeEmail}  
        Employee Picture: ${this.state.employeePicture}    
      `);

      const empJson = {
        employeeid: this.state.employeeId,
        name: this.state.employeeName,
        firstname: this.state.employeeFirstName,
        designationid: this.state.employeeDesignation,
        email: this.state.employeeEmail,
        profilePicPath: this.state.employeePicture

      };

      const user = {
        name: this.state.employeeName,
        username: this.state.employeeFirstName,
        email: this.state.employeeEmail,
        role: this.state.employeeDesignation,
        password: this.state.employeeName
      }
      this.setState({ empJson })

      axios.post(API_BASE_URL_EMP + "/saveemployee", this.state.formData, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
        .then(res => {
          console.log(res.data);

          this.props.reload();

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
      employeeid: this.state.employeeId,
      name: this.state.employeeName,
      firstname: this.state.employeeFirstName,
      designationid: this.state.employeeDesignation,
      email: this.state.employeeEmail,
      profilePicPath: this.state.employeePicture
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
      employeeId: "null",
      employeeName: "null",
      employeeFirstName: "null",
      employeeDesignation: "null",
      employeeEmail: "null",
      employeePicture: "null",
      visible: false
    });

    console.info(`
        --Cancel--
        Employee Id: ${this.state.employeeId}
        Employee Name: ${this.state.employeeName}
        Employee FirstName:${this.state.employeeFirstName}
        Employee Email: ${this.state.employeeEmail}
       
      `);
  };

  render() {
    const { formerrors } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button id="addEmployee" type="primary" onClick={this.showModal} disabled={this.props.addstatus}>
          Add Employee
        </Button>
        <Modal
          title="Add Employee"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="550px"
        >
          <Form>
            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Employee Id">
                  <div>
                    {getFieldDecorator("employeeId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input employeeId!"
                        }
                      ]
                    })(
                      <Input
                        id="employeeId"
                        className={
                          formerrors.employeeId.length > 0 ? "error" : null
                        }
                        placeholder="Employee Id"
                        value={this.state.employeeId}
                        name="employeeId"
                        type="text"
                        onChange={this.handlechange}
                      />
                    )}
                  </div>

                  {formerrors.employeeId.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeId}
                    </span>
                  )}
                </Form.Item>
              </Col>
              <Col span={9} style={{ padding: "5px" }}>
                <Form.Item label="Employee Name">
                  {getFieldDecorator("employeeName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input employeeName!"
                      }
                    ]
                  })(
                    <Input
                      id="employeeName"
                      className={
                        formerrors.employeeName.length > 0 ? "error" : null
                      }
                      placeholder="Employee Name"
                      value={this.state.employeeName}
                      onChange={this.handlechange}
                      name="employeeName"
                      type="text"
                    />
                  )}
                  {formerrors.employeeName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeName}
                    </span>
                  )}
                </Form.Item>
              </Col>
              <Col span={9} style={{ padding: "5px" }}>
                <Form.Item label="Employee FirstName">
                  {getFieldDecorator("employeeFirstName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input employeeFirstName!"
                      }
                    ]
                  })(
                    <Input
                      id="employeeFirstName"
                      className={
                        formerrors.employeeFirstName.length > 0 ? "error" : null
                      }
                      placeholder="Employee FirstName"
                      value={this.state.employeeFirstName}
                      onChange={this.handlechange}
                      name="employeeFirstName"
                      type="text"
                    />
                  )}
                  {formerrors.employeeFirstName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeFirstName}
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Designation">
                  {getFieldDecorator("gender", {
                    rules: [
                      { required: true, message: "Please select designation!" }
                    ]
                  })(
                    <Select
                      id="employeeDesignation"
                      defaultValue="Select Designation"
                      style={{ width: 120 }}
                      onChange={this.onChangeEmployeeDesignation}
                    >
                      {this.state.designations.map(function (item, index) {
                        return (
                          <Option key={index} value={item.designationid}>
                            {item.designationname}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={18} style={{ padding: "5px" }}>
                <Form.Item label="Email">
                  {getFieldDecorator("employeeEmail", {
                    rules: [
                      {
                        required: true,
                        message: "Please input employeeEmail!"
                      }
                    ]
                  })(
                    <Input
                      id="employeeEmail"
                      className={
                        formerrors.employeeEmail.length > 0 ? "error" : null
                      }
                      placeholder="Email"
                      value={this.state.employeeEmail}
                      onChange={this.handlechange}
                      name="employeeEmail"
                      type="text"
                    />
                  )}
                  {formerrors.employeeEmail.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.employeeEmail}
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ padding: "5px" }}>
                <Form.Item label="Profile Picture">
                  <input type="file" className="form-control" name="file" multiple onChange={this.onFileChangeHandler} />
                </Form.Item>
              </Col>
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

export default Form.create()(EmployeeAddModal);