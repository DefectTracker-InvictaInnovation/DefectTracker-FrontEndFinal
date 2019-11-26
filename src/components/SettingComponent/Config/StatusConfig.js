import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Col, Row, Popconfirm, message } from 'antd';
import axios from 'axios';
import {API_BASE_URL_PRODUCT,ACCESS_TOKEN} from './../../../constants/index'

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

export default class StatusConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectStatus: [],
    def: [],
    TotalDefectStatus: []
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
    this.getdefectStatus();
    this.getCountDefectStatus();
  }

  getdefectStatus() {
    const url = API_BASE_URL_PRODUCT+'/defectstatuses';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => this.setState({
        DefectStatus: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });
  }


  getCountDefectStatus() {
    const url = API_BASE_URL_PRODUCT+'/countdefectstatus';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => this.setState({
        TotalDefectStatus: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  editStatus = (id) => {
    this.showEditModal();
    this.setState({ id: id })
    console.log(id);

    axios.get(API_BASE_URL_PRODUCT+'/defectstatus/' + id,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})

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
  deleteDefect = id => {

    console.log(id)

    fetch(API_BASE_URL_PRODUCT+`/defectstatus/` + id, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(id);
    const DefectStatus = this.state.DefectStatus.filter(DefectStatus => {
      return DefectStatus.id !== id;
    });
    this.setState({
      DefectStatus
    })
    message.success("Defect Status Successfully Deleted");
    this.getCountDefectStatus();
  }
  showEditModal = () => {
    console.log("showEditModal clicked");
    this.setState({
      visibleEditModal: true,
    });
  };


  handleOk = e => {

    const obj = {
      name: this.state.name,
      value: this.state.value

    }
    if (this.state.name === "" || this.state.value === "" || (!NameRegex.test(this.state.name) || !NameRegex.test(this.state.value))) {
      message.warn("Invalid Data");
    }
    else if (NameRegex.test(this.state.name) && NameRegex.test(this.state.value)) {
      axios.post(API_BASE_URL_PRODUCT+'/defectstatus/', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        console.log(response);
        this.setState({ events: response.data })
        if (response.status === 200) {

          message.success("Defect Status Successfully Added");
          this.getdefectStatus();
          this.getCountDefectStatus();
        }
      })
        .catch((error) => {
          console.log(error);
          message.warn("Defect Status Already Exist");
        });


    }

    this.setState({
      name: '',
      value: '',
      visible: false,

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
      axios.put(API_BASE_URL_PRODUCT+`/defectstatus/${id}`, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        this.setState({ events: response.data })
        if (response.status === 200) {

          message.success("Defect Status Successfully Updated");
          this.getdefectStatus();
        }
      })
        .catch((error) => {
          console.log(error);
          message.warn("Defect Status Already Exist");
        });
    }

    this.setState({
      name: '',
      value: '',
      visibleEditModal: false
    })

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
      name: "",
      value: ""

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
      case "name":
        if (!NameRegex.test(newstr)) {
          formErrors.name = "Invalid Defect Status";
        }
        else if (newstr.length === 0) {
          formErrors.name = "can't leave this field blank";
        }
        else if (newstr.length < 3) {
          formErrors.name = "Required more than 3 charecters";
        }
        else if (newstr.length > 15) {
          formErrors.name = "Required less than 15 charecters";
        }
        else {
          formErrors.name = "";
        }
        break;
      case "value":
        if (!NameRegex.test(value)) {
          formErrors.value = "Invalid Description";
        }
        else if (value.length < 5) {
          formErrors.value = "Required more than 5 charecters";
        }
        else if (value.length > 50) {
          formErrors.value = "Required less than 50 charecters";
        }

        else if (value.length === 0) {
          formErrors.value = "can't leave this field blank";
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
        title: 'DefectStatus',
        dataIndex: 'name',
        key: 'name',

      },
      {
        title: 'Description',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: 'Action',
        render: (text, data = this.state.def) => (
          <span>
            <Icon id="editStatus" onClick={this.editStatus.bind(this, data.id)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
            <Divider type="vertical" />
            <Popconfirm
              id="deleteComfirmStatus"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}
              />}
              onConfirm={this.deleteDefect.bind(this, data.id)}
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
            style={{ padding: "20px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>

              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                <Form.Item label="Defect Status">
                  <Input
                    id="statusName"
                    type="text"
                    className={formErrors.name.length > 0 ? "error" : null}
                    value={this.state.name}
                    name="name"
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
                    id="statusValue"
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
            title="Edit Status"
            visible={this.state.visibleEditModal}
            onOk={this.handleEditOk.bind(this, this.state.id)}
            onCancel={this.handleEditPriorityCancel}
            style={{ padding: "20px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Defect Status">
                  <Input
                    id="statusName"
                    type="text"
                    className={formErrors.name.length > 0 ? "error" : null}
                    value={this.state.name}
                    name="name"
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
                    id="statusValue"
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
          <Table id="countStatus" columns={columns} dataSource={this.state.DefectStatus} />
          {/* Total Number of Defect Status: {this.state.TotalDefectStatus} */}
          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}

