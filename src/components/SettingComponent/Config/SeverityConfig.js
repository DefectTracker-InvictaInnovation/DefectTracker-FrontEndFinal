import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Col, Row, Popconfirm, message } from 'antd';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import axios from 'axios';
import Dropdown from 'react-dropdown';
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

const options = [
  {
    value: "arrow-up",
    label: <Icon type={'arrow-up'} />
  },
  {
    value: "swap",
    label: <Icon type={'swap'} />
  },
  {
    value: "arrow-down",
    label: <Icon type={'arrow-down'} />
  }
];

const rgbHex = require('rgb-hex');
const hexRgb = require('hex-rgb');

export default class SeverityConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectSeverity: [],
    def: [],
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeIcon = this.onChangeIcon.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteDefectSeverity = this.deleteDefectSeverity.bind(this);
    this.state = {
      name: '',
      value: '',
      color: '',
      icon: '',
      id: ''
    }
  };

  componentDidMount() {
    this.getDefectSeverity()
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  };
  onChangeValue(e) {
    this.setState({
      value: e.target.value
    })
  };
  onChangeIcon = icon => {
    this.setState({
      icon: icon.value
    })
  };

  getDefectSeverity() {
    const url = API_BASE_URL_PRODUCT+'/Severitys';
    axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => this.setState({
        DefectSeverity: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteDefectSeverity(id) {
    console.log(id)
    fetch(API_BASE_URL_PRODUCT+`/Severity/` + id,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(id);
    const DefectSeverity = this.state.DefectSeverity.filter(DefectSeverity => {
      return DefectSeverity.id !== id;
    });
    this.setState({
      DefectSeverity
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.getDefectSeverity();
    let colorStringValue = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
    const obj = {
      name: this.state.name,
      value: this.state.value,
      icon: this.state.icon,
      color: colorStringValue
    }

    if (this.state.name === "" || this.state.value === "" || (!NameRegex.test(this.state.name) || !NameRegex.test(this.state.value))) {
      message.warn("Invalid Data");
    }
    else if (NameRegex.test(this.state.name) && NameRegex.test(this.state.value)) {
    axios.post(API_BASE_URL_PRODUCT+'/Severity/', obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(res => this.getDefectSeverity());
    console.log(obj);
    this.setState({
      name: '',
      value: '',
      icon: '',
      color: '',
      visible: false
    })
  }
};



  editDefectSeverity = (id) => {
    this.showEditModal();
    this.setState({ id: id })
    console.log(id);
    axios.get(API_BASE_URL_PRODUCT+'/Severity/' + id,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(response => {
        let colorRGBValue = hexRgb(response.data.color);
        let colorRGB = {
          r: colorRGBValue.red,
          g: colorRGBValue.green,
          b: colorRGBValue.blue,
          a: colorRGBValue.alpha
        };
        this.setState({
          name: response.data.name,
          value: response.data.value,
          icon: response.data.icon,
          color: colorRGB
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }

  showEditModal = () => {
    console.log("showEditModal clicked");
    this.setState({
      visibleEditModal: true,
    });
  };

  handleEditOk = (id) => {
    let colorString = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
    const obj = {
      id: this.state.id,
      name: this.state.name,
      value: this.state.value,
      icon: this.state.icon,
      color: colorString
    }

    if (this.state.name === "" || this.state.value === "" || (!NameRegex.test(this.state.name) || !NameRegex.test(this.state.value))) {
      message.warn("Invalid Data");
    }
    else if (NameRegex.test(this.state.name) && NameRegex.test(this.state.value)) {
    axios.put(API_BASE_URL_PRODUCT+"/Severity/"+id, obj,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(res => this.getDefectSeverity());
    this.setState({
      name: '',
      value: '',
      icon: '',
      color: '',
      visibleEditModal: false
    })
  }
};




  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleEditPriorityCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
    });
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.setState.displayColorPicker })
  };

  handleClickAfter = () => {
    this.setState({ displayColorPicker: this.setState.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    this.handleClose();
  };

  handleSelect(icon) {
    this.setState({ icon: icon.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {

    const columns = [
      {
        title: 'Severity',
        dataIndex: 'name',
        key: 'name',

      },
      {
        title: 'Description',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        render: (icon) => <Icon type={icon} />,
      },
      {
        title: 'Colour',
        key: 'color',
        dataIndex: 'color',
        render: (colour) => <Icon id="colour" type="minus-square" style={{ color: colour, background: colour }} />,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editSeverity" onClick={this.editDefectSeverity.bind(this, data.id)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
            <Divider type="vertical" />
            <Popconfirm
              id="deleteConfirmSeverity"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }} />}
              onConfirm={this.deleteDefectSeverity.bind(this, data.id)}
            >
              <Icon id="deleteSeverity" type="delete" style={{ fontSize: '17px', color: 'red' }} />
            </Popconfirm>

          </span>
        ),
      },
    ];

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return (
      <React.Fragment>
        <div
          style={{
            padding: 24,
            background: '#fff',
            minHeight: '200px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
          }}>


          <Row>
            <Col span={8}><h3>Severity Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br>
          </br>
          <div>
            <Button id="addSeverity" type="primary" onClick={this.showModal}>
              Add severity
        </Button>
          </div>
          <br></br>

          <Modal
            title=" Add severity"
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

              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Name">
                  <Input
                    id="severityName"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    id="severityValue"
                    type="text"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.onChangeValue}
                  />
                </Form.Item>
                <Form.Item label="Icon"  >
                  <Dropdown
                    id="severityIcon"
                    options={options}
                    onChange={this.onChangeIcon}
                    value={this.state.icon}
                    placeholder="Select an option"
                  />
                </Form.Item>

                <Form.Item id="colour" label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                  </div> : null}

                </Form.Item>

              </Form>
            </div>

          </Modal>

          <Modal
            title="Edit Severity"
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
                <Form.Item label="Name">
                  <Input
                    id="severityName"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    id="severityValue"
                    type="text"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.onChangeValue}
                  />
                </Form.Item>
                <Form.Item label="Icon"  >
                  <Dropdown
                    id="severityIcon"
                    options={options}
                    onChange={this.onChangeIcon}
                    value={this.state.icon}
                    placeholder="Select an option"
                  />
                </Form.Item>
                <Form.Item id="severityColour" label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color} onChange={this.handleChange} />
                  </div> : null}
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table columns={columns} dataSource={this.state.DefectSeverity} />

          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}
