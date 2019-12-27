import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Popconfirm, message } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
import {API_BASE_URL,ACCESS_TOKEN} from './../../../constants/index'

const NameRegex = RegExp(/^[a-zA-Z ]+$/);
//const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);

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
    def: []
  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.editProjectStatus = this.editProjectStatus.bind(this);
    this.deleteProjectStatus = this.deleteProjectStatus.bind(this);


    this.state = {
      projectstatusId:'',
      projectstatusName: '',
      formErrors: {
        projectstatusName: ""
      }
    }
  };


  componentDidMount() {
    this.getprojectStatus();
    // this.getCountProjectType();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
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

//   getCountProjectType() {
//     const url =API_BASE_URL_PRODUCT+'/countdefecttype';
//     axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
//       .then(response => this.setState({
//         CountDefectType: response.data,
//       }))
//       .catch(function (error) {
//         console.log(error);
//       });

//   }


  editProjectStatus = (projectstatusId) => {
    this.showEditModal();
    this.setState({ projectstatusId: projectstatusId })
    console.log(projectstatusId);
    axios.get(API_BASE_URL+'/updateprojectstatus/' + projectstatusId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => {
        this.setState({
          name: response.data.name,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }

  deleteProjectStatus(projectstatusId) {
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
    // this.getCountProjectType();
    message.success("Project Status Successfully Deleted");
  }

  handleOk = e => {
    const obj = {
        projectstatusName: this.state.projectstatusName,
    }
    if (this.state.projectstatusName === "" ||  (!NameRegex.test(this.state.projectstatusName))) {
      message.warn("Invalid Data");
    }

    else if (NameRegex.test(this.state.projectstatusName)) {
      axios.post(API_BASE_URL+'/saveprostatus/', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        this.setState({ events: response.data })
        if (response.data.status === 200) {
          this.getprojectStatus();
          message.success("Project Status Successfully Added");
          // this.getCountDefectType();
        }
      })
        .catch((error) => {
          console.log(error);
          message.warn("Invalid Data");
        });
    }
    this.setState({
      formErrors: {
        projectstatusName: ""
      },
      visible: false,
      projectstatusName: ""
    })
  };

//   handleEditOk = (id) => {
//     const obj = {
//         projectstatusName: this.state.projectstatusName
//     }
//     if (this.state.projectstatusName === "" ||  (!NameRegex.test(this.state.projectstatusName))) {
//       message.warn("Invalid Data");
//     }
//     else if (NameRegex.test(this.state.projectstatusName)) {
//       axios.put(API_BASE_URL+`/defecttype/${id}`, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
//         .then((response) => {
//           this.setState({ events: response.data })
//           if (response.data.status === "OK") {
//             message.success("Project Status Successfully Updated");
//             this.getprojectStatus();
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//           message.warn("Invalid Data");
//         });
//     }

//     this.setState({
//         projectstatusName: '',
//       visible: false,
//       visibleEditModal: false
//     })
//   };

  showEditModal = () => {
    console.log("showEditModal clicked");
    this.setState({
      visibleEditModal: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      projectstatusName: null
    });
  };

  handleEditProjectCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      projectstatusName: null
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
    var newStr = value.replace(/\s+/g, '');
    switch (name) {
      case "projecttypeName":
        if (!NameRegex.test(value)) {
          formErrors.projectstatusName = "Invalid Project Type";
        }
        else if (newStr.length > 15) {
          formErrors.projectstatusName = "Required less than 15 characters";
        }
        else if (newStr.length < 2) {
          formErrors.projectstatusName = "Required greater than 2 characters";
        }
        else if (newStr.length === 0) {
          formErrors.projectstatusName = "Can't leave this field blank";
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
        title: 'ProjectStatus Id',
        dataIndex: 'projectstatusId',
        key: 'projectstatusId',

      },
      {
        title: 'ProjectStatus Name',
        dataIndex: 'projectstatusName',
        key: 'projectstatusName',
      },
      {
        title: 'Action',
        key: 'Action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editProjectStatus" onClick={this.editProjectStatus.bind(this, data.projectstatusId)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />


            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmProjectStatus"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}

              />}
              onConfirm={this.deleteProjectStatus.bind(this, data.projectstatusId)}
            >
              <Icon id="deleteProjectStatus" type="delete" style={{ fontSize: '17px', color: 'red' }} />
            </Popconfirm>

          </span >
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
            <Col span={8}><h3>Project Status Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>

          <br></br>
          <div>
            <Button id="addProjectStatus" type="primary" onClick={this.showModal}>
              Add Project Status
        </Button>
          </div>
          <br></br>

          <Modal
            title="Add Project Status"
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

              <Form labelCol={{ span: 6 }} wrapperCol={{ span: 13 }} >
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
            title="Edit Project Status"
            visible={this.state.visibleEditModal}
            onOk={this.editProjectStatus.bind(this, this.state.projectstatusId)}
            onCancel={this.handleEditProjectCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Project Status">
                  <Input
                    id="projectstatusName"
                    type="text"
                    className={formErrors.projectstatusName.length > 0 ? "error" : null}
                    name="projectstatusName"
                    value={this.state.projectstatusName}
                    onChange={this.handleChange}
                  />
                  {formErrors.projectstatusName.length > 0 && (
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
          <Table id="countProjectStatus" columns={columns} dataSource={this.state.ProjectStatus} />
          <Icon type="square" />
        </div>
      </React.Fragment >
    );
  }

}

