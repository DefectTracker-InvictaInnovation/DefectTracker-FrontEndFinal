import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Popconfirm, message } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd';
import {API_BASE_URL_PRODUCT,ACCESS_TOKEN} from './../../../constants/index'

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

export default class DefectTypeConfic extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectType: [],
    def: [],
    CountDefectType: []

  };


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteDefect = this.deleteDefect.bind(this);


    this.state = {
      name: '',
      value: '',
      formErrors: {
        name: "",
        value: ""
      }
    }
  };


  componentDidMount() {
    this.getdefectType();
    this.getCountDefectType();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  getdefectType() {
    const url = API_BASE_URL_PRODUCT+'/defecttypes';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})

      .then(response => this.setState({
        DefectType: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });

  }

  getCountDefectType() {
    const url =API_BASE_URL_PRODUCT+'/countdefecttype';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => this.setState({
        CountDefectType: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });

  }


  editDefect = (id) => {
    this.showEditModal();
    this.setState({ id: id })
    console.log(id);

    axios.get(API_BASE_URL_PRODUCT+'/defecttype/' + id,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})

      .then(response => {
        this.setState({
          name: response.data.name,
          value: response.data.value
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }

  deleteDefect(id) {

    console.log(id)

    fetch(API_BASE_URL_PRODUCT+'/defecttype/' + id, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(id);
    const DefectType = this.state.DefectType.filter(DefectType => {
      return DefectType.id !== id;
    });
    this.setState({
      DefectType
    })
    this.getCountDefectType();
    message.success("Defect Type Successfully Deleted");
  }

  handleOk = e => {
    this.getdefectType();
    const obj = {
      name: this.state.name,
      value: this.state.value,
    }
    if (this.state.name === "" || this.state.value === "" || (!NameRegex.test(this.state.name) || !NameRegex.test(this.state.value))) {
      message.warn("Invalid Data");
    }

    else if (NameRegex.test(this.state.name) && NameRegex.test(this.state.value)) {
      axios.post(API_BASE_URL_PRODUCT+'/defecttype/', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        this.setState({ events: response.data })
        if (response.data.status === "OK") {
          message.success("Defect Type Successfully Added");
          this.getdefectType();
          this.getCountDefectType();
        }
      })
        .catch((error) => {
          console.log(error);
          message.warn("Invalid Data");
        });
    }
    this.setState({
      formErrors: {
        name: "",
        value: ""
      },
      visible: false,
      name: "",
      value: ""
    })

  };

  handleEditOk = (id) => {

    const obj = {
      name: this.state.name,
      value: this.state.value
    }

    if (this.state.name === "" || this.state.value === "" || (!NameRegex.test(this.state.name) || !NameRegex.test(this.state.value))) {
      message.warn("Invalid Data");
    }
    else if (NameRegex.test(this.state.name) && NameRegex.test(this.state.value)) {
      axios.put(API_BASE_URL_PRODUCT+`/defecttype/${id}`, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
        .then((response) => {
          this.setState({ events: response.data })
          if (response.data.status === "OK") {
            message.success("Defect Type Successfully Updated");
            this.getdefectType();
          }
        })
        .catch((error) => {
          console.log(error);
          message.warn("Invalid Data");
        });
    }


    this.setState({
      name: '',
      value: '',
      visible: false,
      visibleEditModal: false
    })

  };

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
      name: null,
      value: null
    });
  };

  handleEditPriorityCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      name: null,
      value: null
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
      case "name":
        if (!NameRegex.test(value)) {
          formErrors.name = "Invalid Defect Type";
        }
        else if (newStr.length > 15) {
          formErrors.name = "Required less than 15 characters";
        }
        else if (newStr.length < 2) {
          formErrors.name = "Required greater than 2 characters";
        }
        else if (newStr.length === 0) {
          formErrors.name = "Can't leave this field blank";
        }
        else {
          formErrors.name = "";
        }
        break;
      case "value":
        if (!NameRegex.test(value)) {
          formErrors.value = "Invalid Description";
        }
        else if (newStr.length > 50) {
          formErrors.value = "Required less than 50 characters";
        }
        else if (newStr.length < 10) {
          formErrors.value = "Required greater than 10 characters";
        }
        else if (newStr.length === 0) {
          formErrors.value = "Can't leave this field blank";
        }
        else {
          formErrors.value = "";
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
        name :${this.state.name}
        value: ${this.state.value}
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
        title: 'Defect Type',
        dataIndex: 'name',
        key: 'name',

      },
      {
        title: 'Description',
        dataIndex: 'value',
        key: 'Description',
      },
      {
        title: 'Action',
        key: 'Action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editDefectType" onClick={this.editDefect.bind(this, data.id)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />


            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmDefectType"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}

              />}
              onConfirm={this.deleteDefect.bind(this, data.id)}
            >
              <Icon id="deleteDefectType" type="delete" style={{ fontSize: '17px', color: 'red' }} />
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
            <Col span={8}><h3>Defect Type Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>

          <br></br>
          <div>
            <Button id="addDefectType" type="primary" onClick={this.showModal}>
              Add Defect Type
        </Button>
          </div>
          <br></br>

          <Modal
            title="Add Defect Type"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "60px", }}

          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>

              <Form labelCol={{ span: 6 }} wrapperCol={{ span: 13 }} >
                <Form.Item label="Defect Type">
                  <Input
                    id="defectTypeName"
                    type="text"
                    className={formErrors.name.length >= 0 ? "error" : null}
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                  />
                  {formErrors.name.length >= 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.name}
                    </span>
                  )}
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    id="defectTypeValue"
                    type="text"
                    className={formErrors.value.length > 0 ? "error" : null}
                    value={this.state.value}
                    name="value"
                    onChange={this.handleChange}
                  />
                  {formErrors.value.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.value}
                    </span>
                  )}

                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Modal
            title="Edit Defect Type"
            visible={this.state.visibleEditModal}
            onOk={this.handleEditOk.bind(this, this.state.id)}
            onCancel={this.handleEditPriorityCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Defect Type">
                  <Input
                    id="defectTypeName"
                    type="text"
                    className={formErrors.name.length > 0 ? "error" : null}
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  {formErrors.name.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.name}
                    </span>
                  )}
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    id="defectTypeValue"
                    type="text"
                    className={formErrors.value.length > 0 ? "error" : null}
                    name="value"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  {formErrors.value.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formErrors.value}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table id="countDefectType" columns={columns} dataSource={this.state.DefectType} />
          <Icon type="square" />
        </div>
      </React.Fragment >
    );
  }

}

