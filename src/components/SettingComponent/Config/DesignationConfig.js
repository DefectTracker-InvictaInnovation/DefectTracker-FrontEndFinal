import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Popconfirm, message } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
import {API_BASE_URL_EMP,ACCESS_TOKEN} from './../../../constants/index'

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

export default class DesignationConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    Designation: [],
    def: []
  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.editDesignation = this.editDesignation.bind(this);
    this.deleteDesignation = this.deleteDesignation.bind(this);


    this.state = {
        designationid:'',
        designationname: '',
      formErrors: {
        designationname: ""
      }
    }
  };


  componentDidMount() {
    this.getdesignation();
    // this.getCountProjectType();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  getdesignation() {
    const url = API_BASE_URL_EMP+'/getAllDesignation';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})

      .then(response => this.setState({

        Designation: response.data,
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


  editDesignation = (designationid) => {
    this.showEditModal();
    this.setState({ designationid: designationid })
    console.log(designationid);
    axios.get(API_BASE_URL_EMP+'/updatedesignation/' + designationid,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
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

  deleteDesignation(designationid) {
    console.log(designationid)
    fetch(API_BASE_URL_EMP+'/deletedesignation/' + designationid, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(designationid);
    const Designation = this.state.Designation.filter(Designation => {
      return Designation.designationid !== designationid;
    });
    this.setState({
        Designation
    })
    // this.getCountProjectType();
    message.success("Employee Designation Successfully Deleted");
  }

  handleOk = e => {
    const obj = {
        designationname: this.state.designationname,
    }
    if (this.state.designationname === "" ||  (!NameRegex.test(this.state.designationname))) {
      message.warn("Invalid Data");
    }

    else if (NameRegex.test(this.state.designationname)) {
      axios.post(API_BASE_URL_EMP+'/createdesignation/', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        this.setState({ events: response.data })
        if (response.data.status === 200) {
          this.getdesignation();
          message.success("Employee Designation Successfully Added");
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
        designationname: ""
      },
      visible: false,
      designationname: ""
    })
  };

//   handleEditOk = (designationid) => {
//     const obj = {
//         designationname: this.state.designationname
//     }
//     if (this.state.designationname === "" ||  (!NameRegex.test(this.state.designationname))) {
//       message.warn("Invalid Data");
//     }
//     else if (NameRegex.test(this.state.designationname)) {
//       axios.put(API_BASE_URL_EMP+`/updatedesignation/${designationid}`, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
//         .then((response) => {
//           this.setState({ events: response.data })
//           if (response.data.status === "OK") {
//             message.success("Employee Designation Successfully Updated");
//             this.getdesignation();
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//           message.warn("Invalid Data");
//         });
//     }

//     this.setState({
//         designationname: '',
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
      designationname: null
    });
  };

  handleEditDesignationCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      designationname: null
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
      case "designationname":
        if (!NameRegex.test(value)) {
          formErrors.designationname = "Invalid Designationa Name";
        }
        else if (newStr.length > 15) {
          formErrors.designationname = "Required less than 15 characters";
        }
        else if (newStr.length < 2) {
          formErrors.designationname = "Required greater than 2 characters";
        }
        else if (newStr.length === 0) {
          formErrors.designationname = "Can't leave this field blank";
        }
        else {
          formErrors.designationname = "";
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
        designationname :${this.state.designationname}
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
        title: 'Designation Id',
        dataIndex: 'designationid',
        key: 'designationid',

      },
      {
        title: 'Designation Name',
        dataIndex: 'designationname',
        key: 'designationname',
      },
      {
        title: 'Action',
        key: 'Action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editDesignation" onClick={this.editDesignation.bind(this, data.designationid)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />


            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmDesignation"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}

              />}
              onConfirm={this.deleteDesignation.bind(this, data.designationid)}
            >
              <Icon id="deleteDesignation" type="delete" style={{ fontSize: '17px', color: 'red' }} />
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
            <Col span={8}><h3>Employee Designation Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>

          <br></br>
          <div>
            <Button id="addDesignation" type="primary" onClick={this.showModal}>
              Add Employee Designation
        </Button>
          </div>
          <br></br>

          <Modal
            title="Add Employee Designation"
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
                <Form.Item label="Employee Designation">
                  <Input
                    id="designationname"
                    type="text"
                    className={formErrors.designationname.length >= 0 ? "error" : null}
                    value={this.state.designationname}
                    name="designationname"
                    onChange={this.handleChange}
                  />
                  {formErrors.designationname.length >= 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.designationname}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Modal
            title="Edit Employee Designation"
            visible={this.state.visibleEditModal}
            onOk={this.editDesignation.bind(this, this.state.designationid)}
            onCancel={this.handleEditDesignationCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Employee Designation">
                  <Input
                    id="designationname"
                    type="text"
                    className={formErrors.designationname.length > 0 ? "error" : null}
                    name="designationname"
                    value={this.state.designationname}
                    onChange={this.handleChange}
                  />
                  {formErrors.designationname.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.designationname}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table id="Designation" columns={columns} dataSource={this.state.Designation} />
          <Icon type="square" />
        </div>
      </React.Fragment >
    );
  }

}

