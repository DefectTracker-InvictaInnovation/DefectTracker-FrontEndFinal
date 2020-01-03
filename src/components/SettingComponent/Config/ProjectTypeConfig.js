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

export default class ProjectTypeConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    ProjectType: [],
    def: [],
    TotalProjectType: []
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteType = this.deleteType.bind(this);
    this.onChangeprojectType = this.onChangeprojectType.bind(this);
    this.state = {
      projecttypeId: '',
      projecttypeName: '',
      value:'',
      formErrors: {
        projecttypeId: "",
        projecttypeName: ""
      }



    }
  };
  componentDidMount() {
    this.getprojectType();
    // this.getCountDefectStatus();
  }

  onChangeprojectType(e) {
    this.setState({
      projecttypeName: e.target.value
    })
  };

  getprojectType() {
    const url = API_BASE_URL+'/getallprojecttype';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => this.setState({
        ProjectType: response.data,
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

  editType = (projecttypeId) => {
    this.showEditModal();
    this.setState({ projecttypeId: projecttypeId })
    console.log(projecttypeId);
    axios.get(API_BASE_URL+'/getprojecttypeId/' + projecttypeId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => {
        this.setState({
          projecttypeName: response.data.projecttypeName
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }
  deleteType = projecttypeId => {

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
    message.success("Project Type Successfully Deleted");
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
      projecttypeName: this.state.projecttypeName

    }
    if (this.state.projecttypeName === "" || (!NameRegex.test(this.state.projecttypeName))) {
      message.warn("Invalid Data");
    }
    else if (NameRegex.test(this.state.projecttypeName)) {
      axios.post(API_BASE_URL+'/saveprojecttype', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        console.log(response);
        this.setState({ events: response.data })
        if (response.status === 200) {

          message.success("Project Type Successfully Added");
          this.getprojectType();
          // this.getCountDefectStatus();
        }
      })
        .catch((error) => {
          console.log(error);
          message.warn("Project Type Already Exist");
        });


    }

    this.setState({
      projecttypeName: '',
      visible: false,

    })

  };

  handleEditOk = (projecttypeId) => {
    const obj = {
      projecttypeId: this.state.projecttypeId,
      projecttypeName: this.state.projecttypeName
    }
    axios.put(API_BASE_URL+"/updateprojecttype/"+projecttypeId, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(res => this.getprojectType());
    this.setState({
      projecttypeName: '',
      visibleEditModal: false
    })

  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      projecttypeName: null
    });
  };

  handleEditPriorityCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      projecttypeName: ""

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
      case "projecttypeName":
        if (!NameRegex.test(newstr)) {
          formErrors.projecttypeName = "Invalid Defect Status";
        }
        else if (newstr.length === 0) {
          formErrors.projecttypeName = "can't leave this field blank";
        }
        else if (newstr.length < 3) {
          formErrors.projecttypeName = "Required more than 3 charecters";
        }
        else if (newstr.length > 15) {
          formErrors.projecttypeName = "Required less than 15 charecters";
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
        title: 'Project-Type Id ',
        dataIndex: 'projecttypeId',
        key: 'projecttypeId',

      },
      {
        title: 'Project-Type Name',
        dataIndex: 'projecttypeName',
        key: 'projecttypeName',
      },
      {
        title: 'Action',
        render: (text, data = this.state.def) => (
          <span>
            <Icon id="editStatus" onClick={this.editType.bind(this, data.projecttypeId)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
            <Divider type="vertical" />
            <Popconfirm
              id="deleteComfirmStatus"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}
              />}
              onConfirm={this.deleteType.bind(this, data.projecttypeId)}
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
            <Col span={8}><h3>Type Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <div>
            <Button id="addStatus" type="primary" onClick={this.showModal}>
              Add Type
        </Button>
          </div>
          <br></br>

          <Modal
            title=" Add Type"
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
            title="Edit Type"
            visible={this.state.visibleEditModal}
            onOk={this.handleEditOk.bind(this, this.state.projecttypeId)}
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
                <Form.Item label="Project Type">
                  <Input
                    id="projecttypeName"
                    type="text"
                    value={this.state.projecttypeName}
                    name="projecttypeName"
                    onChange={this.onChangeprojectType}
                  />
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table id="countStatus" columns={columns} dataSource={this.state.ProjectType} />
          {/* Total Number of Defect Status: {this.state.TotalDefectStatus} */}
          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}

