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

export default class ProjectTypeConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    ProjectType: [],
    def: []

  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.editProjectType = this.editProjectType.bind(this);


    this.state = {
      projecttypeId:'',
      projecttypeName: '',
      formErrors: {
        projecttypeName: ""
      }
    }
  };


  componentDidMount() {
    this.getProjectType();
    // this.getCountProjectType();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  getProjectType() {
    const url = API_BASE_URL+'/getallprojecttype';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})

      .then(response => this.setState({

        ProjectType: response.data,
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


  editProjectType = projecttypeId => {
    this.showEditModal();
    this.setState({ projecttypeId: projecttypeId })
    console.log(projecttypeId);
    axios.get(API_BASE_URL+'/updateprojecttype/' + projecttypeId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
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

  deleteProjectType = projecttypeId => {
    console.log(projecttypeId)
    fetch(API_BASE_URL+'/deleteprojecttype/' + projecttypeId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(projecttypeId);
    const ProjectType = this.state.ProjectType.filter(ProjectType => {
      return ProjectType.projecttypeId !== projecttypeId;
    });
    this.setState({
      ProjectType
    })
    // this.getCountProjectType();
    message.success("Project Type Successfully Deleted");
  }

  handleOk = e => {
    const obj = {
      projecttypeName: this.state.projecttypeName,
    }
    if (this.state.projecttypeName === "" ||  (!NameRegex.test(this.state.projecttypeName))) {
      message.warn("Invalid Data");
    }

    else if (NameRegex.test(this.state.projecttypeName)) {
      axios.post(API_BASE_URL+'/saveprojecttype/', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        this.setState({ events: response.data })
        if (response.data.status === 200) {
          this.getProjectType();
          message.success("Project Type Successfully Added");
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
        projecttypeName: ""
      },
      visible: false,
      projecttypeName: ""
    })
  };

  // handleEditOk = (projecttypeId) => {
  //   const obj = {
  //     projecttypeName: this.state.projecttypeName
  //   }
  //   if (this.state.projecttypeName === "" ||  (!NameRegex.test(this.state.projecttypeName))) {
  //     message.warn("Invalid Data");
  //   }
  //   else if (NameRegex.test(this.state.projecttypeName)) {
  //     axios.put(API_BASE_URL+`/updateprojecttype/${projecttypeId}`, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
  //       .then((response) => {
  //         this.setState({ events: response.data })
  //         if (response.data.status === "OK") {
  //           message.success("Project Type Successfully Updated");
  //           this.getprojectType();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         message.warn("Invalid Data");
  //       });
  //   }
  //   this.setState({
  //     projecttypeName: '',
  //     visible: false,
  //     visibleEditModal: false
  //   })
  // };

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
      projecttypeName: null
    });
  };

  handleEditProjectCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      projecttypeName: null
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
          formErrors.projecttypeName = "Invalid Project Type";
        }
        else if (newStr.length > 15) {
          formErrors.projecttypeName = "Required less than 15 characters";
        }
        else if (newStr.length < 2) {
          formErrors.projecttypeName = "Required greater than 2 characters";
        }
        else if (newStr.length === 0) {
          formErrors.projecttypeName = "Can't leave this field blank";
        }
        else {
          formErrors.projecttypeName = "";
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
        projecttypeName :${this.state.projecttypeName}
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
        title: 'ProjectType Id',
        dataIndex: 'projecttypeId',
        key: 'projecttypeId',

      },
      {
        title: 'ProjectType Name',
        dataIndex: 'projecttypeName',
        key: 'projecttypeName',
      },
      {
        title: 'Action',
        key: 'Action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editProjectType" onClick={this.editProjectType.bind(this, data.projecttypeId)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />


            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmProjectType"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}

              />}
              onConfirm={this.deleteProjectType.bind(this, data.projecttypeId)}
            >
              <Icon id="deleteProjectType" type="delete" style={{ fontSize: '17px', color: 'red' }} />
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
            <Col span={8}><h3>Project Type Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>

          <br></br>
          <div>
            <Button id="addProjectType" type="primary" onClick={this.showModal}>
              Add Project Type
        </Button>
          </div>
          <br></br>

          <Modal
            title="Add Project Type"
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
                <Form.Item label="Project Type">
                  <Input
                    id="projecttypeName"
                    type="text"
                    className={formErrors.projecttypeName.length >= 0 ? "error" : null}
                    value={this.state.projecttypeName}
                    name="projecttypeName"
                    onChange={this.handleChange}
                  />
                  {formErrors.projecttypeName.length >= 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.projecttypeName}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Modal
            title="Edit Project Type"
            visible={this.state.visibleEditModal}
            onOk={this.editProjectType.bind(this, this.state.projecttypeId)}
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
                <Form.Item label="Project Type">
                  <Input
                    id="projecttypeName"
                    type="text"
                    className={formErrors.projecttypeName.length > 0 ? "error" : null}
                    name="projecttypeName"
                    value={this.state.projecttypeName}
                    onChange={this.handleChange}
                  />
                  {formErrors.projecttypeName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.projecttypeName}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table id="countProjectType" columns={columns} dataSource={this.state.ProjectType} />
          <Icon type="square" />
        </div>
      </React.Fragment >
    );
  }

}

