import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Popconfirm, message } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
import {API_BASE_URL,ACCESS_TOKEN} from '../../../constants/index'

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

export default class DefectRelease extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectRelease: [],
    def: []

  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.editRelease = this.editRelease.bind(this);


    this.state = {
      releaseId:'',
      releaseName: '',
      formErrors: {
        releaseName: ""
      }
    }
  };


  componentDidMount() {
    this.getRelease();
    // this.getCountProjectType();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  getRelease() {
    const url = API_BASE_URL+'/releases';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})

      .then(response => this.setState({

        DefectRelease: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });

  }

  editRelease = releaseId => {
    this.showEditModal();
    this.setState({ releaseId: releaseId })
    console.log(releaseId);
    axios.get(API_BASE_URL+'/updateRelease/' + releaseId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
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

  deleteRelease = releaseId => {
    console.log(releaseId)
    fetch(API_BASE_URL+'/release/' + releaseId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(releaseId);
    const DefectRelease = this.state.ProjectType.filter(DefectRelease => {
      return DefectRelease.releaseId !== releaseId;
    });
    this.setState({
      DefectRelease
    })
    // this.getCountProjectType();
    message.success("Release Successfully Deleted");
  }

  handleOk = e => {
    const obj = {
      releaseName: this.state.releaseName,
    }
    if (this.state.releaseName === "" ||  (!NameRegex.test(this.state.releaseName))) {
      message.warn("Invalid Data");
    }

    else if (NameRegex.test(this.state.releaseName)) {
      axios.post(API_BASE_URL+'/release/', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        this.setState({ events: response.data })
        if (response.data.status === 200) {
          this.getProjectType();
          message.success("Release Successfully Added");
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
        releaseName: ""
      },
      visible: false,
      releaseName: ""
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
      releaseName: null
    });
  };

  handleEditReleaseCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      releaseName: null
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
      case "releaseName":
        if (!NameRegex.test(value)) {
          formErrors.releaseName = "Invalid Release";
        }
        else if (newStr.length > 15) {
          formErrors.releaseName = "Required less than 15 characters";
        }
        else if (newStr.length < 2) {
          formErrors.releaseName = "Required greater than 2 characters";
        }
        else if (newStr.length === 0) {
          formErrors.releaseName = "Can't leave this field blank";
        }
        else {
          formErrors.releaseName = "";
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
        releaseName :${this.state.releaseName}
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
        title: 'Release Id',
        dataIndex: 'releaseId',
        key: 'releaseId',

      },
      {
        title: 'Release Name',
        dataIndex: 'releaseName',
        key: 'releaseName',
      },
      {
        title: 'Action',
        key: 'Action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editRelease" onClick={this.editRelease.bind(this, data.releaseId)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />


            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmRelease"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}

              />}
              onConfirm={this.deleteRelease.bind(this, data.releaseId)}
            >
              <Icon id="deleteRelease" type="delete" style={{ fontSize: '17px', color: 'red' }} />
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
            <Col span={8}><h3>Release Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>

          <br></br>
          <div>
            <Button id="addRelease" type="primary" onClick={this.showModal}>
              Add Release
        </Button>
          </div>
          <br></br>

          <Modal
            title="Add Release"
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
                <Form.Item label="Defect Release">
                  <Input
                    id="releaseName"
                    type="text"
                    className={formErrors.releaseName.length >= 0 ? "error" : null}
                    value={this.state.releaseName}
                    name="releaseName"
                    onChange={this.handleChange}
                  />
                  {formErrors.releaseName.length >= 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.releaseName}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Modal
            title="Edit Release"
            visible={this.state.visibleEditModal}
            onOk={this.editRelease.bind(this, this.state.releaseId)}
            onCancel={this.handleEditReleaseCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Release">
                  <Input
                    id="releaseName"
                    type="text"
                    className={formErrors.releaseName.length > 0 ? "error" : null}
                    name="releaseName"
                    value={this.state.releaseName}
                    onChange={this.handleChange}
                  />
                  {formErrors.releaseName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.releaseName}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table id="DefectRelease" columns={columns} dataSource={this.state.DefectRelease} />
          <Icon type="square" />
        </div>
      </React.Fragment >
    );
  }

}

