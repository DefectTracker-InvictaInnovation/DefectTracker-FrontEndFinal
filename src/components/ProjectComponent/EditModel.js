import { Modal, Form, Row, Col, message,Input, Icon, DatePicker,Select } from "antd";
import Table from "./Table"
import React from "react";
import axios from "axios";
import moment from "moment";
import {API_BASE_URL,ACCESS_TOKEN} from './../../constants/index'
import {notificationmsg} from '../../services/PrivilegeConfig';

const { Option } = Select;
function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}
function confirm(e) {
  console.log(e)
  message.success("Edit Successfully!");
}
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

export default class Model extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeprojectId = this.onChangeprojectId.bind(this);
    this.onChangeprojectName = this.onChangeprojectName.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeProjectAbbr=this.onChangeProjectAbbr.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);

    this.state = {
      projectId: this.props.projectProps,
      projectName: '',
      duration: '',
      startDate: '',
      endDate: '',
      status: '',
      type: '',
      projectAbbr:"",
      projecttype:[],
      projectstatus:[]
    }

    this.fetchTypes = this.fetchTypes.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.fetchStatus = this.fetchStatus.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
  };
  componentDidMount() {
    this.handleEdit(this.props.projectProps)
    this.fetchTypes();
    this.fetchStatus();

  }
  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };
  onChangeprojectId = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      projectId: e.target.value
    });
  };
  onChangeprojectName = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      projectName: e.target.value
    });
  };
  onChangeType = (value) => {
    this.setState({
      type: `${value}`
    });
    console.log(this.state.type);
  };
  // onChangeProjectAbbre(value) {
  //   this.setState({
  //     projectAbbr: `${value}`
  //   });
  //   console.log(this.state.projectAbbr);
  // }
  onChangeProjectAbbr(e) {
    this.setState({
     projectAbbr: e.target.value
   });
    console.log(this.state.projectAbbr);
  }
  fetchTypes() {
    var _this = this;
    axios
      .get(API_BASE_URL+"/getallprojecttype",{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(function (response) {
        console.log(response);
        _this.setState({ projecttype: response.data });
        console.log(_this.state.projecttype);
      });
  }

  onChangeDuration = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      duration: e.target.value
    });
  };
  onChangeStatus = (value) => {
    this.setState({
      status: `${value}`
    });
    console.log(this.state.status);
  };

  fetchStatus() {
    var _this = this;
    axios
      .get(API_BASE_URL+'/getallprostatus',{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({ projectstatus: response.data });
        console.log(_this.state.projectstatus);
      });
  }
  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  };

  onChangeStartDate(date, dateString) {
    this.setState({ startDate: dateString }, () =>
      console.log(this.state.startDate)
    );
    console.log(this.state.startDate);
  }

  onChangeEndDate(date, dateString) {
    this.setState({ endDate: dateString }, () =>
      console.log(this.state.endDate)
    );
    console.log(this.state.endDate);
  }

  showEditModal = () => {
    console.log("showEditModal");
    console.log(this.state.projectId);
    this.handleEdit(this.state.projectId);
    this.setState({
      visibleEditModal: true,
    });
  }

  handleEdit = (projectId) => {
    this.setState({projectId:projectId});
    axios
      .get(API_BASE_URL+"/getProjectById/"+projectId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}
      )
      .then(response => {

        console.log(response.data)
        this.setState({
          projectId:response.data.projectId,
          projectName: response.data.projectName,
          projectAbbr:response.data.projectAbbr,
          duration: response.data.duration,
          status: response.data.status,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          type: response.data.type,

        });
        
      })
      .catch(err => console.log(err));
  };

  handleEditOk () {
    console.log(this.state.projectId);

    const obj = {
      projectId: this.state.projectId,
      projectName: this.state.projectName,
      projectAbbr:this.state.projectAbbr,
      duration: this.state.duration,
      status: this.state.status,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      type: this.state.type
    }
    console.log("proojectId");
    console.log("startDate")

    axios.put(API_BASE_URL+'/updateProject/'+ this.state.projectId, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(res => {

    this.setState({
      projectId: '',
      projectName: '',
      duration: '',
      status: '',
      projectAbbr:'',
      startDate: '',
      endDate: '',
      type: '',
      visibleEditModal: false
    });
    message.success("Edit Successfully!");
  });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false
    });
  };

  render() {
    return (
      <div>
        <Icon
          type="edit"
          // onClick={this.showEditModal}
          disabled={this.props.qastatus}
          onClick={this.props.EditProject?notificationmsg.bind(this,'warning','Edit'):this.showEditModal}
          style={{ fontSize: "18px", color: "Blue" }}
        />
        <br />
        <Modal
          title="Edit Project"
          visible={this.state.visibleEditModal}
          onOk={this.handleEditOk}
          onCancel={this.handleCancel}
          width="600px"
          okText="Update"
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Name">
                  <Input
                    placeholder="Project Name"
                    value={this.state.projectName}
                    onChange={this.onChangeprojectName}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
            <Col span={24}>
                <Form.Item label="Project Abbrevation">
                <Input
                        id="projectAbbr"
                        placeholder="Project Abbrevation"
                        // name="projectAbbr"
                        value={this.state.projectAbbr}
                        onChange={this.onChangeProjectAbbr}
                      />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Type">
                <Select
                      id="SelectType"
                      placeholder="Type "
                      defaultValue="Select Type"
                      value={this.state.type}
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
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Start Date">
                  <Form.Item>
                    <DatePicker
                      value={moment(this.state.startDate)}
                      onChange={this.onChangeStartDate}
                      placeholder="Start Date"
                    />
                  </Form.Item>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="End Date">
                  <Form.Item>
                    <DatePicker
                      value={moment(this.state.endDate)}
                      onChange={this.onChangeEndDate}
                      placeholder="End Date"
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Duration">
                  <Input
                    placeholder="Duration"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                  />
                </Form.Item>{" "}
              </Col>

              <Col span={12} style={{ padding: "5px" }}>
                <Form.Item label="Status">
                <Select
                        id="status"
                        placeholder="Status"
                        name="status"
                        onChange={this.onChangeStatus}
                        value={this.state.status}
                      >
                        {this.state.projectstatus.map(function (item, index) {
                        return (
                          <Option key={index} value={item.projectstatusName}>
                            {item.projectstatusName}
                          </Option>
                        );
                      })}
                      </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}