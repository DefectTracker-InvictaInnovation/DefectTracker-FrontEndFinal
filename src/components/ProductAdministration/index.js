
    import React from 'react';
    import { Table, Divider, Modal, Button, Icon, Form, Input, Popconfirm, message,Select,TreeSelect } from 'antd';
    // import { SketchPicker } from 'react-color';
    // import reactCSS from 'reactcss';
    import axios from 'axios';
    import { Row, Col } from 'antd';

    const TreeNode = TreeSelect.TreeNode;
    const Option = Select.Option;
    
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
    
    export default class ProductAdministration extends React.Component {
      state = {
        visible: false,
        visibleEditModal: false,
        DefectType: [],
    
        def: [],
        CountDefectType: []
    
      };
    
    
      constructor(props) {
        super(props);
        //this.onChangeName = this.onChangeName.bind(this);
        //this.onChangeValue = this.onChangeValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleEditOk = this.handleEditOk.bind(this);
        this.deleteDefect = this.deleteDefect.bind(this);
    
    
        this.state = {
          name: '',
          value: '',
          // id: '',
          formErrors: {
            name: "",
            value: ""
            //id: ""
          }
        }
      };
    
    
      componentDidMount() {
        //this.componentWillMount();
        this.getdefectType();
        this.getCountDefectType();
        //setInterval(this.componentWillMount);
    
      }
      // onChangeName(e) {
      //   this.setState({
      //     name: e.target.value
      //   })
      // };
      // onChangeValue(e) {
      //   this.setState({
      //     value: e.target.value
      //   })
      //};
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      getdefectType() {
        const url = 'http://localhost:8083/productservice/defecttypes';
        axios.get(url)
    
          .then(response => this.setState({
            DefectType: response.data,
          }))
          .catch(function (error) {
            console.log(error);
          });
    
      }
    
      getCountDefectType() {
        const url = 'http://localhost:8083/productservice/defecttype';
        axios.get(url)
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
    
        axios.get('http://localhost:8083/productservice/defecttype/' + id)
    
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
    
        fetch(`http://localhost:8083/productservice/defecttype/` + id, {
    
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
        message.error("Defect Type Successfully Deleted");
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
          // axios.post('http://localhost:8081/defectservice/defecttype/', obj)
          //   .then(res => this.getdefectType());
          axios.post('http://localhost:8083/productservice/defecttype/', obj).then((response) => {
            // console.log(response);
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
    
        // else if (newName.length < 2 || newName.length > 15 || newValue.length < 10 || newValue.length > 50) {
        //   message.warn("aaaa");
        // }
    
    
        this.setState({
          formErrors: {
            name: "",
            value: ""
            //id: ""
          },
          visible: false,
          name: "",
          value: ""
        })
    
      };
    
      handleEditOk = (id) => {
    
        const obj = {
          id:this.state.id,
          name: this.state.name,
          value: this.state.value
        }
    
        if (this.state.name === "" || this.state.value === "" || (!NameRegex.test(this.state.name) || !NameRegex.test(this.state.value))) {
          message.warn("Invalid Data");
        }
        else if (NameRegex.test(this.state.name) && NameRegex.test(this.state.value)) {
          axios.put("http://localhost:8083/productservice/defecttype/"+ id, obj)
            .then((response) => {
              //console.log(response.data);
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
        //console.log(newStr);
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
              //this.handleOk = false;
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
            title: 'License Type',
            dataIndex: 'name',
            key: 'name',
    
          },
          {
            title: 'Year',
            dataIndex: 'value',
            key: 'Description',
          },
          {
            title: 'Price',
            key: 'Colour',
             dataIndex: 'Colour',
            render: (colour) => <Icon type="border" style={{ color: colour, background: colour }} />,
           },
          {
            title: 'Action',
            key: 'Action',
            render: (text, data = this.state.def) => (
              <span>
    
                <Icon id="editDefectType" onClick={this.editDefect.bind(this, data.id)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
    
    
                <Divider type="vertical" />
    
                <Popconfirm
                  id="deleteConfirmTLicenseType"
                  title="Are you sure, Do you want to delete this ?"
                  icon={<Icon type="delete" style={{ color: 'red' }}
    
                  />}
                  onConfirm={this.deleteDefect.bind(this, data.id)}
                >
                  <Icon id="deleteLicenseType" type="delete" style={{ fontSize: '17px', color: 'red' }} />
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
                <Col span={8}><h3>Manage Product License</h3></Col>
                <Col span={6}></Col>
                <Col span={10}></Col>
              </Row>
    
              <br></br>
              <div>
                <Button id="addDefectType" type="primary" onClick={this.showModal}>
                  Add License 
            </Button>
              </div>
              <br></br>
    
              <Modal
                title="Add License"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{ padding: "60px", }}
                width="550px"
    
              >
                <div
                  style={{
                    margin: "0 -20px 0 0",
                    background: '#fff',
                    minHeight: '200px',
                    
                  }}>
    
                  
                  <Form>
                  <Row>
                  <Col>
                    <Col span={24} style={{ padding: "5px" }}>
                    <Form.Item label="License Name">
                      <Input
                        id="defectTypeName"
                        type="text"
                        name="name"/>
                    </Form.Item>
                    </Col>
                    <Col span={12} style={{ padding: "5px" }}>
                    <Form.Item label="Year">
                    <Select defaultValue="1 Year" style={{ width: '100%' }} >
                         <Option value="1 ">1 Year</Option>
                         <Option value="2 ">2 Year</Option>
                         <Option value="3 ">3 Year</Option>
                         <Option value="4">4 Year</Option>
                    </Select>
                    </Form.Item>
                    </Col>
                    <Col span={12} style={{ padding: "5px" }}>
                    <Form.Item label="Price">
                    <Select defaultValue="100$" style={{ width: '100%' }} >
                         <Option value="1 ">100$</Option>
                         <Option value="2 ">200$</Option>
                         <Option value="3 ">300$</Option>
                         <Option value="4 ">400$</Option>
                    </Select>
                    </Form.Item>
                    </Col>
                 
                  
                    
                    <Col span={12} style={{ padding: "5px" }}>
                    <Form.Item label="User">
                    <Select defaultValue="below 100" style={{ width: '100%' }} >
                         <Option value="1 ">below 100</Option>
                         <Option value="2 ">100-249</Option>
                         <Option value="3 ">250-500</Option>
                         <Option value="4">Above 500</Option>
                    </Select>
                    </Form.Item>
                    </Col>
                    <Col span={12} style={{ padding: "5px" }}>
                    <Form.Item label="Year">
                    <Select defaultValue="100$" style={{ width: '100%' }} >
                         <Option value="1 ">100$</Option>
                         <Option value="2 ">200$</Option>
                         <Option value="3 ">300$</Option>
                         <Option value="4 ">400$</Option>
                    </Select>
                    </Form.Item>
                    </Col>
                   
                  </Col>
                  </Row>
                  </Form>
                  </div>
    
              </Modal>
              <Modal
                title="Edit License Type"
                visible={this.state.visibleEditModal}
                onOk={this.handleEditOk.bind(this, this.state.id)}
                onCancel={this.handleEditPriorityCancel}
                style={{ padding: "60px", }}
              >
                <div
                  style={{
                    margin: "0 -20px 0 0",
                    background: '#fff',
                    minHeight: '200px',
                    
                  }}>
    
                  
                  <Form>
                  <Row>
                  <Col>
                    <Col span={18}>
                    <Form.Item label="License Name">
                      <Input
                        id="defectTypeName"
                        type="text"
                        name="name"/>
                    </Form.Item>
                    </Col>
                    <Col span={12} style={{ padding: "5px" }}>
                    <Form.Item label="Year">
                    <Select defaultValue="1 Year" style={{ width: '100%' }} >
                         <Option value="1 ">1 Year</Option>
                         <Option value="2 ">2 Year</Option>
                         <Option value="3 ">3 Year</Option>
                         <Option value="4">4 Year</Option>
                    </Select>
                    </Form.Item>
                    </Col>
                    <Col span={12} style={{ padding: "5px" }}>
                    <Form.Item label="Price">
                    <Select defaultValue="100$" style={{ width: '100%' }} >
                         <Option value="1 ">100$</Option>
                         <Option value="2 ">200$</Option>
                         <Option value="3 ">300$</Option>
                         <Option value="4 ">400$</Option>
                    </Select>
                    </Form.Item>
                    </Col>
                 
                  
                    
                    <Col span={12} style={{ padding: "5px" }}>
                    <Form.Item label="User">
                    <Select defaultValue="below 100" style={{ width: '100%' }} >
                         <Option value="1 ">below 100</Option>
                         <Option value="2 ">100-249</Option>
                         <Option value="3 ">250-500</Option>
                         <Option value="4">Above 500</Option>
                    </Select>
                    </Form.Item>
                    </Col>
                    <Col span={12} style={{ padding: "5px" }}>
                    <Form.Item label="Year">
                    <Select defaultValue="100$" style={{ width: '100%' }} >
                         <Option value="1 ">100$</Option>
                         <Option value="2 ">200$</Option>
                         <Option value="3 ">300$</Option>
                         <Option value="4 ">400$</Option>
                    </Select>
                    </Form.Item>
                    </Col>
                   
                  </Col>
                  </Row>
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