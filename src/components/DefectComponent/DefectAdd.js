import { Modal, Button, Form, message, Input, Select, Row, Col, Upload, Icon } from "antd";
import React from "react";
import axios from "axios";
import { API_BASE_URL, API_BASE_URL_EMP,API_BASE_URL_PRODUCT,ACCESS_TOKEN,CURRENT_USER } from '../../constants/index';
import { getcuruser } from './../App/Login/util/ApiUtil'

const { Option } = Select;
const { TextArea } = Input;
const id = 1;



const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);

const formValid = ({ formerrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formerrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
class DefectAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moduleId: "",
      defectId: "",
      abbre: "",
      projectAbbr: "",
      defectAbbr: "",
      projectId: "",
      priority: "",
      severity: "",
      type: "",
      status: "New",
      defectDescription: "",
      stepsToRecreate: "",
      assignTo: "",
      reassignTo: "Reassign ",
      enteredBy: "",
      fixedBy: "FixedBy",
      availableIn: "Available",
      foundIn: "",
      fixedIn: "FixedIn",
      // dateAndTime: "",

      visible: false,
      formerrors: {
        defectId: "",
        defectDescription: "",
        stepsToRecreate: "",
        employeeName: "",
        employeeFirstName: "",
        employeeEmail: ""
      },

      projects: [],
      modules: [],
      prioritys: [],
      severitys: [],
      defectStatus: [],
      assignToopt: '',
      assproid: "",
      addAttachment: {
        name: "",
        action: "",
        headers: "",
        multiple: true
      },
      images: [],

      statuss: [],
      projects: [],
      modules: [],
      prioritys: [],
      severitys: [],
      types: [],
      defectfoundIn: [],
      assignToopt: "",
      assproid: ""
    };

    this.handlechange = this.handlechange.bind(this);
    // Severity
    this.fetchSeveritys = this.fetchSeveritys.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);

    //Defect Type
    this.fetchTypes = this.fetchTypes.bind(this);
    this.onChangeType = this.onChangeType.bind(this);

    //Priority
    this.fetchPrioritys = this.fetchPrioritys.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);

    //Module
    this.fetchModules = this.fetchModules.bind(this);
    this.onChangeModule = this.onChangeModule.bind(this);

    //Status
    this.fetchStatus = this.fetchStatus.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    //Project
    this.fetchProjects = this.fetchProjects.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);

    this.fetchFoundIn = this.fetchFoundIn.bind(this);
    this.onChangeFoundIn = this.onChangeFoundIn.bind(this);

    this.handleOk = this.handleOk.bind(this);
  }

  componentDidMount() {
    this.fetchStatus();
    this.fetchTypes();
    this.fetchProjects();
    this.fetchModules();
    this.fetchPrioritys();
    this.fetchSeveritys();
    this.enteredBy();
    this.showModalView();
    console.log("mounting");
    this.fetchFoundIn();
  }

  fetchStatus() {
    var _this = this;
    axios
      .get(API_BASE_URL_PRODUCT+"/defectstatuses",{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(function (response) {
        console.log(response);
        _this.setState({ defectStatus: response.data });
        console.log(_this.state.defectStatus);
      });
  }

  fetchFoundIn() {
    var _this = this;
    axios
      .get("http://localhost:8081/defectservices/releases")
      .then(function (response) {
        console.log(response);
        _this.setState({ defectfoundIn: response.data });
        console.log(_this.state.defectfoundIn);
      });
  }

  fetchTypes() {
    var _this = this;
    axios
      .get("http://localhost:8083/productservice/defecttypes")
      .then(function (response) {
        console.log(response);
        _this.setState({ types: response.data });
        console.log(_this.state.types);
      });
  }

  fetchProjects() {
    var _this = this;
    axios
      .get(API_BASE_URL + "/getallresource")
      .then(function (response) {
        console.log(response.data);
        _this.setState({ projects: response.data });
        console.log(_this.state.projects);
      });
  }

  fetchModules(value) {
    var _this = this;
    axios
      .get("http://localhost:8081/defectservices/FindallMain")
      .then(function (response) {
        console.log(response.data);

        let x=response.data.map(function (item, index) {
                       
          if(value == item.project.projectId){
            return (
              <Option key={index} value={item.moduleId}>
                {item.moduleName}
              </Option>
            );
          }
          
        })

         _this.setState({x });
        // console.log(_this.state.modules);
      });
  }

  fetchSeveritys() {
    var _this = this;
    axios
      .get("http://localhost:8083/productservice/Severitys")
      .then(function (response) {
        console.log(response.data);
        _this.setState({ severitys: response.data });
        console.log(_this.state.severitys);
      });
  }

  fetchPrioritys() {
    var _this = this;
    axios
      .get("http://localhost:8083/productservice/defectpriorities")
      .then(function (response) {
        console.log(response.data);
        _this.setState({ prioritys: response.data });
        console.log(_this.state.prioritys);
      });
  }

  onChangeFoundIn(value) {
    this.setState({
      foundIn: `${value}`
    });
    console.log(this.state.foundIn);
  }

  onChangeType(value) {
    this.setState({
      type: `${value}`
    });
    console.log(this.state.type);
  }

  onChangeStatus(value) {
    this.setState({
      status: `${value}`
    });
    console.log(this.state.status);
  }

  onChangeSeverity(value) {
    this.setState({
      severity: `${value}`
    });
    console.log(this.state.severity);
  }

  onChangePriority(value) {
    this.setState({
      priority: `${value}`
    });
    console.log(this.state.priority);
  }

  onChangeModule(value) {
    this.setState({
      moduleId: `${value}`
    });
    console.log(this.state.moduleId);
  }

  onChangeProject(value) {
    this.setState({
      projectId: `${value}`
    });
this.fetchModules(value)
    var _this = this;
    axios
      .get(API_BASE_URL + '/getallresource')
      .then(function (response) {
        console.log(response.data);
        let assignToopt = response.data.map((post, index) => {
          if ((_this.state.projectId == post.projectId) && ("Developer" == (post.designationname))) {
            console.log("hhghjghg");
            return <Option key={index} value={post.name}>{post.name}</Option>
          }
        });

        _this.setState({ assignToopt });
        console.log(response.data);
      });
    console.log(_this.state.projectId);
  }

  handleChangeEnterrdBy = value => {
    this.setState({ enteredBy: value });
  };

  handleChangeFoundIn = value => {
    this.setState({ foundIn: value });
  };

  handleChangeAssignTo = value => {
    this.setState({ assignTo: value });
    this.assinNoti(value);
  };

  handleChangeProject(value) {
    console.log(value); 
  }

  handlechange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "defectId":
        if (!ValidRegex.test(value)) {
          formerrors.defectId = "Invalid Id";
        } else if (value.length > 15) {
          formerrors.defectId = "Should be less than 15 characters";
        } else if (value.length < 2) {
          formerrors.defectId = "Should be greater than 2 characters";
        } else {
          formerrors.defectId = "";
        }
        break;

      case "employeeName":
        if (!NameRegex.test(value)) {
          formerrors.employeeName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.employeeName = "Should be less than 30 characters";
        } else {
          formerrors.employeeName = "";
        }
        break;
      default:
        break;
    }
    this.setState({ formerrors, [name]: value }, () => console.log(this.state));
  };

  enteredBy() {
    getcuruser().then(res => {
      this.setState({
        enteredBy: res.data.name
      })
    })
  }

  assinNoti = (value) => {
    axios
      .get(API_BASE_URL_EMP + "/getallemployee")
      .then(response => {
        console.log(response.data);
        console.log(value);
        response.data.map((post, index) => {
          if (value === post.name) {
            this.setState({ email: post.email })
          }


        })
        const emailnoti = {
          email: this.state.email,
          subject: "This defect assign ",
          text: "check"
        };
        this.setState({ emailnoti })
        console.log(this.state.assignTo);

      })
      .catch(function (error) {
        console.log(error);
      });



  }


  handleOk = e => {

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        message.success("Successfully Added!!!");
        this.setState({ visible: false });
      } else {
      }
    });
    if (formValid(this.state)) {
      console.info(`
        --SUBMITTING--    
        Defect Id: ${this.state.defectId}  
        Defect Abbr:${this.state.defectAbbr}
        Abbre: ${this.state.projectAbbr}
        Assign To: ${this.state.assignTo}
        Available In: ${this.state.availableIn}
        Data And Time: ${this.state.dateAndTime}
        Defect Description: ${this.state.defectDescription}
        Entered By: ${this.state.enteredBy}
        Fixed By: ${this.state.fixedBy}
        Fixed In: ${this.state.fixedIn}
        Found In: ${this.state.foundIn}
        Priority: ${this.state.priority}
        Reassign To: ${this.state.reassignTo}
        Severity: ${this.state.severity}
        Status: ${this.state.status}
        Steps To Recreate: ${this.state.stepsToRecreate}
        Type: ${this.state.type}
        Module Id: ${this.state.moduleId}
        Project Id: ${this.state.projectId}
      `);

      const serverport = {
        defectId: this.state.defectId,
        projectId: this.state.projectId,
        type: this.state.type,
        defectAbbr: this.state.defectAbbr,
        moduleId: this.state.moduleId,
        abbre: this.state.projectAbbr,
        priority: this.state.priority,
        severity: this.state.severity,
        status: this.state.status,
        defectDescription: this.state.defectDescription,
        stepsToRecreate: this.state.stepsToRecreate,
        assignTo: this.state.assignTo,
        reassignTo: this.state.reassignTo,
        enteredBy: localStorage.getItem(CURRENT_USER),
        fixedBy: this.state.fixedBy,
        availableIn: this.state.availableIn,
        foundIn: this.state.foundIn,
        fixedIn: this.state.fixedIn,
        // dateAndTime: this.state.dateAndTime,
      };
      console.log(serverport);
      axios.post(API_BASE_URL + "/saveDefect", serverport)

        .then(res => console.log(res.data))
        .catch(error => {
          console.log(error);
        });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }


    var mail = this.state.emailnoti;
    console.log(mail);
    axios
      .post(API_BASE_URL_EMP + "/sendmail", mail)
      .then(res => {

        console.log(res.data);
      });
  };
  // post integration finishes
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.setState({
      projectId: "",
      moduleId: "",
      defectId: "",
      priority: "",
      severity: "",
      status: "",
      type: "",
      defectDescription: "",
      stepsToRecreate: "",
      assignTo: "",
      enteredBy: "",
      foundIn: "",
      defectAbbr: "",
      // dateAndTime:"",

      visible: false
    });

    console.info(`
        --Cancel--
        Employee Id: ${this.state.employeeId}
        Employee Name: ${this.state.employeeName}
        Employee FirstName:${this.state.employeeFirstName}
        Employee Email: ${this.state.employeeEmail}   
        Defect Id: ${this.state.defectId}   
        Abbre: ${this.state.abbre}
        Assign To: ${this.state.assignTo}
        Available In: ${this.state.availableIn}
        Data And Time: ${this.state.dateAndTime}
        Defect Description: ${this.state.defectDescription}
        Entered By: ${this.state.enteredBy}
        Fixed By: ${this.state.fixedBy}
        Fixed In: ${this.state.fixedIn}
        Found In: ${this.state.foundIn}
        Priority: ${this.state.priority}
        Reassign To: ${this.state.reassignTo}
        Severity: ${this.state.severity}
        Status: ${this.state.status}
        Steps To Recreate: ${this.state.stepsToRecreate}
        Type: ${this.state.type}
        Module Id: ${this.state.moduleId}
        Project Id: ${this.state.projectId}
       
      `);
  };

  attachment = id => {
    axios
      .get(API_BASE_URL + "/listFile/" + id)
      .then(data => {
        data.data.map(file => {
          console.log(file.fileDownloadUri);
          var duri = "http:" + file.fileDownloadUri;
          console.log(duri);
          this.setState({
            images: [...this.state.images, duri],
            isOpen: true
          });
        });
      });
  };

  showModalView = () => {
    var id = "Def002";
    console.log(this.state.defectId)
    this.setState({
      addAttachment: {
        name: "files",
        action:
          API_BASE_URL + "/uploadMultipleFiles?defectId=" +
          id,
        headers: {
          authorization: "authorization-text"
        },
        multiple: true
      }
    });
    console.log(this.state.addAttachment);
    // this.getComment(id);
    // this.setState({
    //   showModalView: true,
    //   defectId: id,
    //   comments: "",
    //   images: []
    // });
  };


  render() {
    const { formerrors } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button id="addDefect" type="primary" onClick={this.showModal} disabled={this.props.qastatus}>
          Add Defect
        </Button>
        <Modal
          title="Add Defect"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="550px"
        >
          <Form>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Project">
                  {getFieldDecorator("gender1", {
                    rules: [
                      { required: true, message: "Please select Project!" }
                    ]
                  })(
                    <Select
                      id="Project"
                      placeholder="Project "
                      defaultValue="Select Project"
                      onChange={this.onChangeProject}
                    >
                      {this.state.projects.map(function(item, index) {
                        if(item.firstname==localStorage.getItem(CURRENT_USER))
                        return (
                          <Option key={index} value={item.projectId}>
                            {item.projectName}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Module">
                  {getFieldDecorator("gender4", {
                    rules: [
                      { required: true, message: "Please select Module!" }
                    ]
                  })(
                    <Select
                      id="Module"
                      placeholder="Module "
                      defaultValue="Select Module"
                      onChange={this.onChangeModule}
                    >
                      {this.state.x}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Assign To">
                  <Select
                    id="assignTo"
                    placeholder="Assign To"
                    name="assignTo"
                    type="text"
                    onChange={this.handleChangeAssignTo}
                  >
                    {this.state.assignToopt}
                  </Select>

                </Form.Item>
              </Col>
              <Col span={24} style={{ padding: "5px" }}>
                <Form.Item label="Defect Description">
                  <div>
                    {getFieldDecorator("defectDescription", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Description!"
                        }
                      ]
                    })(

                      <TextArea
                        id="DefectDescription"
                        placeholder="Defect Description"
                        value={this.state.defectDescription}
                        onChange={this.handlechange}
                        name="defectDescription"
                        type="text"
                        autosize={{ minRows: 4, maxRows: 10 }}
                      />
                    )}
                  </div>
                </Form.Item>
              </Col>
              <Col span={24} style={{ padding: "5px" }}>
                <Form.Item label="Steps To Recreate ">
                  <div>
                    {getFieldDecorator("stepsToRecreate", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Details!"
                        }
                      ]
                    })(

                      <TextArea
                        id="stepsToRecreate"
                        placeholder="Steps To Recreate "
                        value={this.state.stepsToRecreate}
                        onChange={this.handlechange}
                        name="stepsToRecreate"
                        type="text"
                        autosize={{ minRows: 4, maxRows: 10 }}
                      />
                    )}
                  </div>

                </Form.Item>
              </Col>


              {/* <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Entered By">
                  <Select
                    id="enteredBy"
                    placeholder="Entered By"
                    onChange={this.handleChangeEnterrdBy}
                    name="enteredBy"
                    type="text"
                    disabled
                  >
                    <Option value="user1">User 1</Option>
                    <Option value="user2">User 2</Option>
                    <Option value="user3">User 3</Option>
                  </Select>



                </Form.Item>
              </Col> */}


              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Found In ">
                  <Select
                    id="foundIn"
                    placeholder="Found In "
                    
                    name="foundIn"
                    type="text"
                    onChange={this.onChangeFoundIn}
                  >
                    
                    {this.state.defectfoundIn.map(function (item, index) {
                      return (
                        <Option key={index} value={item.releaseName}>
                          {item.releaseName}
                        </Option>
                      );
                    })}
                  </Select>



                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Priority">
                  {getFieldDecorator("gender3", {
                    rules: [
                      { required: true, message: "Please select Priority!" }
                    ]
                  })(
                    <Select
                      id="Priority"
                      placeholder="Priority"
                      onChange={this.onChangePriority}
                    >
                      {this.state.prioritys.map(function (item, index) {
                        return (
                          <Option key={index} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Status">
                  {getFieldDecorator("gender7", {
                    rules: [
                      { required: true, message: "Please select status!" }
                    ]
                  })(
                    <Select
                      id="Status"
                      placeholder="New"
                      onChange={this.onChangeStatus}
                      // defaultActiveFirstOptio={true} 
                    >
                      {this.state.defectStatus.map(function (item, index) {
                        return (
                          <Option defaultValue="New" key={index} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Type">
                  {getFieldDecorator("gender6", {
                    rules: [{ required: true, message: "Please select Type!" }]
                  })(
                    <Select
                      id="SelectType"
                      placeholder="Type "
                      defaultValue="Select Type"
                      onChange={this.onChangeType}
                    >
                      {this.state.types.map(function (item, index) {
                        return (
                          <Option key={index} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Severity">
                  {getFieldDecorator("gender2", {
                    rules: [
                      { required: true, message: "Please select Severity!" }
                    ]
                  })(
                    <Select
                      id="Severity"
                      placeholder="Severity "
                      onChange={this.onChangeSeverity}
                    >
                      {this.state.severitys.map(function (item, index) {
                        return (
                          <Option key={index} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }

  validateName = name => {
    if (name.length < 2) {
      return { validateStatus: "error", errorMsg: "Name is short." };
    }
  };
}

export default Form.create()(DefectAdd);