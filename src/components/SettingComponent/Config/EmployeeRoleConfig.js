import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Popconfirm, message } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
import {ACCESS_TOKEN,API_BASE_URL_PRODUCT} from '../../../constants/index'

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

export default class EmployeeRole extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    Role: [],
    def: []

  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.editRole = this.editRole.bind(this);


    this.state = {
      roleId:'',
      roleName: '',
      formErrors: {
        roleName: ""
      }
    }
  };


  componentDidMount() {
    this.getRole();
    // this.getCountProjectType();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  getRole() {
    const url = API_BASE_URL_PRODUCT+'/getAllRoleInfos';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})

      .then(response => this.setState({

        ProjecRoletType: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });

  }

  editRole = roleId => {
    this.showEditModal();
    this.setState({ roleId: roleId })
    console.log(roleId);
    axios.get(API_BASE_URL_PRODUCT+'/updateprojecttype/' + roleId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
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

  deleteProjectType = roleId => {
    console.log(roleId)
    fetch(API_BASE_URL_PRODUCT+'/deleteprojecttype/' + roleId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(roleId);
    const Role = this.state.ProjectType.filter(Role => {
      return Role.roleId !== roleId;
    });
    this.setState({
      Role
    })
    // this.getCountProjectType();
    message.success("Role Successfully Deleted");
  }

  handleOk = e => {
    const obj = {
      roleName: this.state.roleName,
    }
    if (this.state.roleName === "" ||  (!NameRegex.test(this.state.roleName))) {
      message.warn("Invalid Data");
    }

    else if (NameRegex.test(this.state.roleName)) {
      axios.post(API_BASE_URL_PRODUCT+'/Role/', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        this.setState({ events: response.data })
        if (response.data.status === 200) {
          this.getProjectType();
          message.success("Role Successfully Added");
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
        roleName: ""
      },
      visible: false,
      roleName: ""
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
      roleName: null
    });
  };

  handleEditRoleCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      roleName: null
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
      case "roleName":
        if (!NameRegex.test(value)) {
          formErrors.roleName = "Invalid Project Type";
        }
        else if (newStr.length > 15) {
          formErrors.roleName = "Required less than 15 characters";
        }
        else if (newStr.length < 2) {
          formErrors.roleName = "Required greater than 2 characters";
        }
        else if (newStr.length === 0) {
          formErrors.roleName = "Can't leave this field blank";
        }
        else {
          formErrors.roleName = "";
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
        roleName :${this.state.roleName}
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
        title: 'Role Id',
        dataIndex: 'roleId',
        key: 'roleId',

      },
      {
        title: 'Role Name',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: 'Action',
        key: 'Action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editRole" onClick={this.editRole.bind(this, data.roleId)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />


            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmRole"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}

              />}
              onConfirm={this.deleteRole.bind(this, data.roleId)}
            >
              <Icon id="deleteRole" type="delete" style={{ fontSize: '17px', color: 'red' }} />
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
            <Col span={8}><h3>Role Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>

          <br></br>
          <div>
            <Button id="addRole" type="primary" onClick={this.showModal}>
              Add Role
        </Button>
          </div>
          <br></br>

          <Modal
            title="Add Role"
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
                <Form.Item label="Role Name">
                  <Input
                    id="roleName"
                    type="text"
                    className={formErrors.roleName.length >= 0 ? "error" : null}
                    value={this.state.roleName}
                    name="roleName"
                    onChange={this.handleChange}
                  />
                  {formErrors.roleName.length >= 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.roleName}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Modal
            title="Edit Role"
            visible={this.state.visibleEditModal}
            onOk={this.editRole.bind(this, this.state.roleId)}
            onCancel={this.handleEditRoleCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Role">
                  <Input
                    id="roleName"
                    type="text"
                    className={formErrors.roleName.length > 0 ? "error" : null}
                    name="roleName"
                    value={this.state.roleName}
                    onChange={this.handleChange}
                  />
                  {formErrors.roleName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.roleName}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table id="EmployeeRole" columns={columns} dataSource={this.state.Role} />
          <Icon type="square" />
        </div>
      </React.Fragment >
    );
  }

}

