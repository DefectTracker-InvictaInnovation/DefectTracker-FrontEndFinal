import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  message,
  Select
} from "antd";
import React from "react";
import moment from 'moment';
import axios from "axios";
import {  API_BASE_URL, ACCESS_TOKEN } from '../../constants/index';

const { Option } = Select;
function confirm(e) {
  console.log(e);
  message.success("Delete Successfully!");
}
const { MonthPicker, RangePicker } = DatePicker;

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);
const DurationRegex = RegExp(/^[0-9]+$/);

const config = {
  rules: [{ type: "object", required: true, message: "Please select time!" }]
};
const rangeConfig = {
  rules: [{ type: "array", required: true, message: "Please select time!" }]
};

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

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: "",
      projectName: "",
      type: "",
      projectAbbr: "",
      startDate: "",
      endDate: "",
      duration: "",
      projectAbbr: "",
      status: "",
      visible: false,
      formerrors: {
        projectId: "",
        projectName: "",
        type: "",
        startDate: "",
        endDate: "",
        duration: "",
        projectAbbr: "",
        status: ""
      },
      projecttype: [],
      projectstatus: []
    };
    this.handlechange = this.handlechange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.fetchTypes = this.fetchTypes.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.fetchStatus = this.fetchStatus.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeProjectId = this.onChangeProjectId.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeProjectAbbr = this.onChangeProjectAbbr.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
  }

  handlechange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "projectId":
        if (!ValidRegex.test(value)) {
          formerrors.projectId = "Invalid Id";
        } else if (value.length > 8) {
          formerrors.projectId = "Should be less than 8 characters";
        } else {
          formerrors.projectId = "";
        }
        break;
      case "projectName":
        if (!ValidRegex.test(value)) {
          formerrors.projectName = "Invalid Name";
        }
        if (value.length > 30) {
          formerrors.projectName = "Should be less than 70 characters";
        } else {
          formerrors.projectName = "";
        }
        break;

      case "startDate":
        if (!NameRegex.test(value)) {
          formerrors.startDate = "Invalid start date";
        } else if (value.length > 30) {
          formerrors.startDate = "Should be less than 30 characters";
        } else {
          formerrors.startDate = "";
        }
        break;

      case "endDate":
        if (!NameRegex.test(value)) {
          formerrors.endDate = "Invalid end date";
        } else if (value.length > 30) {
          formerrors.endDate = "Should be less than 30 characters";
        } else {
          formerrors.endDate = "";
        }
        break;

      case "duration":
        if (!DurationRegex.test(value)) {
          formerrors.duration = "Invalid Duration";
        } else if (value.length > 30) {
          formerrors.duration = "Should be less than 30 characters";
        } else {
          formerrors.duration = "";
        }
        break;
      default:
        break;
    }
    this.setState({ formerrors, [name]: value }, () => console.log(this.state));
  };

  componentDidMount() {
    this.fetchTypes();
    this.fetchStatus();
  }
  onChangeProjectId(value) {
    this.setState({
      projectId: `${value}`
    });
    console.log(this.state.projectId);
  }
  onChangeProjectAbbre(value) {
    this.setState({
      projectAbbr: `${value}`
    });
    console.log(this.state.projectAbbr);
  }


  onChangeProjectName(value) {
    this.setState({
      projectName: `${value}`
    });
    console.log(this.state.projectName);
  }
  onChangeDuration(value) {
    this.setState({
      duration: `${value}`
    });
    console.log(this.state.duration);
  }

  onChangeProjectAbbr(value) {
    this.setState({
      projectAbbr: `${value}`
    });
    console.log(this.state.projectAbbr);
  }
  handleChangeType = value => {
    this.setState({ type: value });
  };

  fetchTypes() {
    var _this = this;
    axios
      .get(API_BASE_URL + "/getallprojecttype", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response);
        _this.setState({ projecttype: response.data });
        console.log(_this.state.projecttype);
      });
  }

  onChangeType(value) {
    this.setState({
      type: `${value}`
    });
    console.log(this.state.type);
  }

  fetchStatus() {
    var _this = this;
    axios
      .get(API_BASE_URL + '/getallprostatus', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({ projectstatus: response.data });
        console.log(_this.state.projectstatus);
      });
  }

  onChangeStatus(value) {
    this.setState({
      status: `${value}`
    });
    console.log(this.state.status);
  }

  handleChangeStatus = value => {
    this.setState({ status: value });
  };

  onChangeStartDate = (date, dateString) => {
    this.setState({ startDate: dateString }, () =>
      console.log(this.state.startDate)
    );

    console.log(this.state.startDate);
  };
  onChangeEndDate = (date, dateString) => {
    this.setState({ endDate: dateString }, () =>
      console.log(this.state.endDate)
    );

    console.log(this.state.endDate);
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        message.success("Successfully Added!!!");
        this.setState({ visible: false });
      } else {
      }
    });
    if (formValid(this.state)) {
      console.info(`
        --SUBMITTING--
        Project Id: ${this.state.projectId}
        Project Name: ${this.state.projectName}
        Project Type:${this.state.type}
        Project Start Date: ${this.state.startDate}
        Project End Date: ${this.state.endDate}
        Project Duration: ${this.state.duration}
        project Project Abbr: ${this.state.projectAbbr}
        Project Status : ${this.state.status}
        Project Abbre: ${this.state.projectAbbr}
 `);

      const projectData = {
        projectId: this.state.projectId,
        projectName: this.state.projectName,
        type: this.state.type,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        duration: this.state.duration,
        status: this.state.status,
        projectAbbr: this.state.projectAbbr
      };

      console.log(projectData);
      axios
        .post(
          API_BASE_URL + "/createproject", projectData, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
        .then(res => {
          console.log(res.data)
          this.props.reload()

        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  state = { visible: false };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formerrors } = this.state;
    return (
      <div>
        <Button id="addProject" type="primary" onClick={this.showModal} disabled={this.props.qastatus}>
          Add Project
        </Button>
        <br />
        <Modal
          title="Add Project"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >
          <Form layout="vertical" >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Name">
                  <div>
                    {getFieldDecorator("projectName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input projectName!"
                        }
                      ]
                    })(
                      <Input
                        id="projectName"
                        className={
                          formerrors.projectName.length > 0 ? "error" : null
                        }
                        placeholder="Project Name"
                        name="projectName"
                        value={this.state.projectName}
                        onChange={this.handlechange}
                      />
                    )}
                  </div>
                  {formerrors.projectName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.projectName}
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Abbrevation">
                  <div>
                    {getFieldDecorator("projectAbbr", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project Abbrevation!"
                        }
                      ]
                    })(
                      <Input
                        id="projectAbbr"
                        className={
                          formerrors.projectName.length > 0 ? "error" : null
                        }
                        placeholder="Project Abbrevation"
                        name="projectAbbr"
                        value={this.state.projectAbbr}
                        onChange={this.handlechange}
                      />
                    )}
                  </div>
                  {formerrors.projectName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.projectName}
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Type" >
                  <div>
                    {getFieldDecorator("type", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project Type!"
                        }
                      ]
                    })(
                      <Select
                        id="SelectType"
                        placeholder="Type "
                        defaultValue="Select Type"
                        onChange={this.onChangeType}
                      >
                        {this.state.projecttype.map(function (item, index) {
                          return (
                            <Option key={index} value={item.projecttypeName}>
                              {item.projecttypeName}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </div>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Start Date">
                  <div>
                    {getFieldDecorator("startDate", {
                      rules: [
                        {
                          required: true,
                          message: "Please input startDate!"
                        }
                      ]
                    })(
                      <DatePicker
                        id="startDate"
                        placeholder="Start Date"
                        name="startDate"
                        value={this.state.startDate}
                        onChange={this.onChangeStartDate}
                      />
                    )}
                  </div>
                  {formerrors.startDate.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.startDate}
                    </span>
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>

                <Form.Item
                  label="End Date">
                  <div>
                    {getFieldDecorator("endDate", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project End Date!"
                        }
                      ]
                    })(
                      <DatePicker
                        id="endDate"
                        placeholder="End Date"
                        name="endDate"
                        onChange={this.onChangeEndDate}
                        value={this.state.endDate}
                      />
                    )}
                  </div>
                  {formerrors.endDate.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.endDate}
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Duration">
                  <div>
                    {getFieldDecorator("duration", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project Duration!"
                        }
                      ]
                    })(
                      <Input
                        id="duration"
                        placeholder="Duration"
                        name="duration"
                        value={this.state.duration}
                        onChange={this.handlechange}
                      />
                    )}
                  </div>
                  {formerrors.duration.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.duration}
                    </span>
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Status" >
                  <div>
                    {getFieldDecorator("status", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project Status!"
                        }
                      ]
                    })(
                      <Select
                        id="status"
                        placeholder="Status"
                        name="status"
                        onChange={this.onChangeStatus}
                      >
                        {this.state.projectstatus.map(function (item, index) {
                          return (
                            <Option key={index} value={item.projectstatusName}>
                              {item.projectstatusName}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(Model);
