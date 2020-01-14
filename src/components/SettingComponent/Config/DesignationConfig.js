import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Col, Row, notification, message } from 'antd';
import axios from 'axios';
import {API_BASE_URL,ACCESS_TOKEN, API_BASE_URL_EMP} from './../../../constants/index'

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

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'This is Warning Message',
    description:
      "This is the contain Valuable Data.If You delete this all data can't retrive!!!!",
  });
};

export default class DesignationConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    Designation: [],
    def: [],
    TotalDesignation: []
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteDesignation = this.deleteDesignation.bind(this);
    this.onChangedesignation = this.onChangedesignation.bind(this);
    this.state = {
      designationid: '',
      designationname: '',
      value:'',
      formErrors: {
        designationid: "",
        designationname: ""
      }



    }
  };
  componentDidMount() {
    this.getDesignation();
    // this.getCountDefectStatus();
  }

  onChangedesignation(e) {
    this.setState({
      designationname: e.target.value
    })
  };

  getDesignation() {
    const url = API_BASE_URL_EMP+'/getAllDesignation';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => this.setState({
        Designation: response.data,
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

  editDesignation = (designationid) => {
    this.showEditModal();
    this.setState({ designationid: designationid })
    console.log(designationid);
    axios.get(API_BASE_URL_EMP+'/getbydesignationId/' + designationid,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => {
        this.setState({
          designationname: response.data.designationname
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }
  deleteDesignation = designationid => {

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
    message.success("Designation Successfully Deleted");
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
      designationname: this.state.designationname

    }
    if (this.state.designationname === "" || (!NameRegex.test(this.state.designationname))) {
      message.warn("Invalid Data");
    }
    else if (NameRegex.test(this.state.designationname)) {
      axios.post(API_BASE_URL_EMP+'/createdesignation', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then((response) => {
        console.log(response);
        this.setState({ events: response.data })
        if (response.status === 200) {

          message.success("Designation Successfully Added");
          this.getDesignation();
          // this.getCountDefectStatus();
        }
      })
        .catch((error) => {
          console.log(error);
          message.warn("Designation Already Exist");
        });


    }

    this.setState({
      createdesignation: '',
      visible: false,

    })

  };

  handleEditOk = (designationid) => {
    const obj = {
      designationid: this.state.designationid,
      designationname: this.state.designationname
    }
    axios.put(API_BASE_URL_EMP+"/updatedesignation/"+designationid, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(res => this.getDesignation());
    this.setState({
      designationname: '',
      visibleEditModal: false
    })
    this.getDesignation();
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      designationname: null
    });
  };

  handleEditPriorityCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
      designationname: ""

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
      case "designationname":
        if (!NameRegex.test(newstr)) {
          formErrors.designationname = "Invalid Designation Name";
        }
        else if (newstr.length === 0) {
          formErrors.designationname = "can't leave this field blank";
        }
        else if (newstr.length < 2) {
          formErrors.designationname = "Required more than 2 charecters";
        }
        else if (newstr.length > 15) {
          formErrors.designationname = "Required less than 15 charecters";
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
      // {
      //   title: 'Designation Id ',
      //   dataIndex: 'designationid',
      //   key: 'designationid',

      // },
      {
        title: 'Designation Name',
        dataIndex: 'designationname',
        key: 'designationname',
      },
      {
        title: 'Action',
        render: (text, data = this.state.def) => (
          <span>
            <Icon id="editStatus" onClick={this.editDesignation.bind(this, data.designationid)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
            <Divider type="vertical" />
            {/* <Popconfirm
              id="deleteComfirmStatus"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }}
              />}
              onConfirm={this.deleteDesignation.bind(this, data.designationid)}
            > */}
              <Icon id="deleteStatus" type="delete" style={{ fontSize: '17px', color: 'red' }} onClick={() => openNotificationWithIcon('warning')}  />
            {/* </Popconfirm> */}
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
            <Col span={8}><h3>Designation Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <div>
            <Button id="addStatus" type="primary" onClick={this.showModal}>
              Add Designation
        </Button>
          </div>
          <br></br>

          <Modal
            title=" Add Designation"
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

              <Form labelCol={{ span: 8 }} wrapperCol={{ span: 15}}>
                <Form.Item label="Designation Name">
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
            title="Edit Designation"
            visible={this.state.visibleEditModal}
            onOk={this.handleEditOk.bind(this, this.state.designationid)}
            onCancel={this.handleEditPriorityCancel}
            style={{ padding: "40px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '80px',

              }}>
              <Form labelCol={{ span: 8 }} wrapperCol={{ span: 15}} onSubmit={this.handleSubmit}>
                <Form.Item label="Designation Name">
                  <Input
                    id="designationname"
                    type="text"
                    value={this.state.designationname}
                    name="designationname"
                    onChange={this.onChangedesignation}
                  />
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table id="countStatus" columns={columns} dataSource={this.state.Designation} />
          {/* Total Number of Defect Status: {this.state.TotalDefectStatus} */}
          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}

