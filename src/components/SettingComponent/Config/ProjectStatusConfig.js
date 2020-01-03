import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Col, Row, Popconfirm, message } from 'antd';
import axios from 'axios';
import {API_BASE_URL,ACCESS_TOKEN} from './../../../constants/index'

const NameRegex = RegExp(/^[a-zA-Z ]+$/);
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class ProjectStatusConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    ProjectStatus: [],
    def: [],
    TotalProjectStatus: []
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteStatus = this.deleteStatus.bind(this);
    this.onChangeprojectStatus = this.onChangeprojectStatus.bind(this);
    this.state = {
      projectstatusId: '',
      projectstatusName: '',
      formErrors: {
        projectstatusId: "",
        projectstatusName: ""
      }



    }
  };
  componentDidMount() {
    this.getprojectStatus();
    // this.getCountDefectStatus();
  }

  onChangeprojectStatus(e) {
    this.setState({
      projectstatusName: e.target.value
    })
  };
  getprojectStatus() {
    const url = API_BASE_URL+'/getallprostatus';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => this.setState({
        ProjectStatus: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });
  }


  // getCountDefectStatus() {
  //   const url = API_BASE_URL_PRODUCT+'/countdefectstatus';
  //   axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
  //     .then(response => this.setState({
  //       TotalDefectStatus: response.data,
  //     }))
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  editStatus = (projectstatusId) => {
    this.showEditModal();
    this.setState({ projectstatusId: projectstatusId })
    console.log(projectstatusId);
    axios.get(API_BASE_URL+'/getprojectstatusId/' + projectstatusId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => {
        this.setState({
          projectstatusName: response.data.projectstatusName
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }
  deleteStatus = projectstatusId => {

    console.log(projectstatusId)

    fetch(API_BASE_URL+'/deleteprojectstatus/' + projectstatusId, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(projectstatusId);
    const ProjectStatus = this.state.ProjectStatus.filter(ProjectStatus => {
      return ProjectStatus.projectstatusId !== projectstatusId;
    });
    this.setState({
      ProjectStatus
    })
    message.success("Project Status Successfully Deleted");
    // this.getCountDefectStatus();
  }
  showEditModal = () => {
    console.log("showEditModal clicked");
    this.setState({
      visibleEditModal: true,
    });
  };


  handleOk = e => {

    const obj = {
      projectstatusName: this.state.projectstatusName

    }
    if (this.state.projectstatusName === "" || (!NameRegex.test(this.state.projectstatusName))) {
      message.warn("Invalid Data");
    }
    else if (NameRegex.test(this.state.projectstatusName)) {
      axios.post(API_BASE_URL+'/saveprostatus', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        console.log(response);
        this.setState({ events: response.data })
        if (response.status === 200) {

          message.success("Project Status Successfully Added");
          this.getprojectStatus();
          // this.getCountDefectStatus();
        }
      })
        .catch((error) => {
          console.log(error);
          message.warn("Project Status Already Exist");
        });


    }

    this.setState({
      projectstatusName: '',
      visible: false,

    })

  };

  handleEditOk = (projectstatusId) => {
    const obj = {
      projectstatusId: this.state.projectstatusId,
      projectstatusName: this.state.projectstatusName
    }
    axios.put(API_BASE_URL+"/updateprojectstatus/"+projectstatusId, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(res => this.getprojectStatus());
    this.setState({
      projectstatusName: '',
      visibleEditModal: false
    })
   

  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      projectstatusName: null
    });
  };

  handleEditPriorityCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      projectstatusName: ""

    });
  };

  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };



  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    var newstr = value.replace(/\s+/g, '');
    switch (name) {
      case "projectstatusName":
        if (!NameRegex.test(newstr)) {
          formErrors.projectstatusName = "Invalid Defect Status";
        }
        else if (newstr.length === 0) {
          formErrors.projectstatusName = "can't leave this field blank";
        }
        else if (newstr.length < 3) {
          formErrors.projectstatusName = "Required more than 3 charecters";
        }
        else if (newstr.length > 15) {
          formErrors.projectstatusName = "Required less than 15 charecters";
        }
        else {
          formErrors.projectstatusName = "";
        }
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

  };

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        projectstatusName :${this.state.projectstatusName}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  }
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { formErrors } = this.state;
    const columns = [
      {
        title: 'Project-Status Id ',
        dataIndex: 'projectstatusId',
        key: 'projectstatusId',

      },
      {
        title: 'Project-Status Name',
        dataIndex: 'projectstatusName',
        key: 'projectstatusName',
      },
      {
        title: 'Action',
        render: (text, data = this.state.def) => (
          <span>
            <Icon id="editStatus" onClick={this.editStatus.bind(this, data.projectstatusId)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
            <Divider type="vertical" />
            <Popconfirm
              id="deleteComfirmStatus"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}
              />}
              onConfirm={this.deleteStatus.bind(this, data.projectstatusId)}
            >
              <Icon id="deleteStatus" type="delete" style={{ fontSize: '17px', color: 'red' }} />
            </Popconfirm>
          </span>
        ),
      },
    ];
    return (
      <React.Fragment>
        <div
          style={{
            padding: 24,
            background: '#fff',
            minHeight: '500px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
          }}>

          <Row>
            <Col span={8}><h3>Status Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <div>
            <Button id="addStatus" type="primary" onClick={this.showModal}>
              Add Status
        </Button>
          </div>
          <br></br>

          <Modal
            title=" Add Status"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "40px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '80px',

              }}>

              <Form labelCol={{ span: 6 }} wrapperCol={{ span: 13}}>
                <Form.Item label="Project Status">
                <Input
                    id="projectstatusName"
                    type="text"
                    className={formErrors.projectstatusName.length >= 0 ? "error" : null}
                    value={this.state.projectstatusName}
                    name="projectstatusName"
                    onChange={this.handleChange}
                  />
                  {formErrors.projectstatusName.length >= 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.projectstatusName}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>

          <Modal
            title="Edit Status"
            visible={this.state.visibleEditModal}
            onOk={this.handleEditOk.bind(this, this.state.projectstatusId)}
            onCancel={this.handleEditPriorityCancel}
            style={{ padding: "40px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '80px',

              }}>
              <Form labelCol={{ span: 6 }} wrapperCol={{ span: 13 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Project Status">
                  <Input
                    id="projectstatusName"
                    type="text"
                    value={this.state.projectstatusName}
                    name="projectstatusName"
                    onChange={this.onChangeprojectStatus}
                  />
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table id="countStatus" columns={columns} dataSource={this.state.ProjectStatus} />
          {/* Total Number of Defect Status: {this.state.TotalDefectStatus} */}
          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}

