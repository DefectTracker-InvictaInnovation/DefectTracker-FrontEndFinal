import React from "react";
import { Table, Icon, Form, Select, Row, Col, Upload, Input, Modal, Button, TreeSelect, Tag, Comment, Avatar, List, Popconfirm, message, Divider } from "antd";
import moment from "moment";
import axios from "axios";
import EditorIn from "./Editor";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { API_BASE_URL, API_BASE_URL_EMP, CURRENT_USER, API_BASE_URL_PRODUCT, ACCESS_TOKEN } from '../../constants/index';
import { ROLE_NAME } from '../../constants/index';
import DefectLog from "./DefectLog";
import DefectAdd from "./DefectAdd";
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const { TextArea } = Input;
const id = 1;
const props = {
  name: "files",
  action:
    API_BASE_URL + "/uploadMultipleFiles?defectId=" + id,
  headers: {
    authorization: "authorization-text"
  },
  multiple: true
};

function confirm(e) {
  console.log(e);

  message.success("Successfully Deleted");
}

function cancel(e) {
  console.log(e);

  message.error("Click on No");
}
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

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

class TableFilter extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDefectId = this.onChangeDefectId.bind(this);
    this.onChangeAbbre = this.onChangeAbbre.bind(this);
    this.onChangeDefectDescription = this.onChangeDefectDescription.bind(this);
    this.onChangeStepsToRecreate = this.onChangeStepsToRecreate.bind(this);
    this.onChangeAssignTo = this.onChangeAssignTo.bind(this);
    this.onChangeReassignTo = this.onChangeReassignTo.bind(this);
    this.onChangeEnteredBy = this.onChangeEnteredBy.bind(this);
    this.onChangeFixedBy = this.onChangeFixedBy.bind(this);
    this.onChangeAvailableIn = this.onChangeAvailableIn.bind(this);
    this.onChangeFoundIn = this.onChangeFoundIn.bind(this);
    this.onChangeFixedIn = this.onChangeFixedIn.bind(this);
    this.onChangeDateAndTime = this.onChangeDateAndTime.bind(this);

    this.state = {
      searchText: "",
      filteredInfo: null,
      sortedInfo: null,
      defect: [],
      moduleId: "",
      defectId: "",
      abbre: "",
      projectId: "",
      defectAbbr: "",
      //moduleId: "",
      priority: "Medium",
      severity: "Medium",
      type: "",
      status: "",
      defectDescription: "",
      stepsToRecreate: "",
      assignTo: "",
      reassignTo: "",
      enteredBy: "",
      fixedBy: "",
      fixDate: "",
      availableIn: "",
      foundIn: "",
      fixedIn: "",
      dateAndTime: "",
      addAttachment: {
        name: "",
        action: "",
        headers: "",
        multiple: true
      },
      images: [],
      user: "",
      audit: "",
      comment: [],
      photoIndex: 0,
      isOpen: false,
      count: 0,
      visible: false,
      visible1: false,
      showModalView: false,
      comments: [],
      submitting: false,
      value: "",
      types: [],
      defid: '',
      assin: '',
      email: '',
      to: '',
      subject: '',
      text: '',
      befotype: '',
      befostatus: '',
      befoassignTo: '',
      befopriority: '',
      befoseverity: '',
      afterstatus: '',
      afterseverity: '',
      afterpriority: '',
      afterassignTo: '',
      aftertype: '',
      Alldefect: ''

    };
    this.handleDelete = this.handleDelete.bind(this);
    this.refreshDefect = this.refreshDefect.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showModalView = this.showModalView.bind(this);
    this.state = {
      searchText: "",
      employees: [],
      patients: [],
      projects: [],
      modules: [],
      Total: "",
      assignToopt: '',
      defectTypes: [],
      defectSeverity: [],
      defectPriority: [],
      defectStatus: [],
      defectfoundIn: [],
      defectfixedIn: [],
      formerrors: {
        defectId: "",
        defectDescription: "",
        stepsToRecreate: "",
        employeeName: "",
        employeeFirstName: "",
        employeeEmail: ""
      },
    };

    this.fetchProjects = this.fetchProjects.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangeProjects = this.onChangeProjects.bind(this);
    this.fetchModules = this.fetchModules.bind(this);
    this.onChangeModule = this.onChangeModule.bind(this);
    this.fetchTypes = this.fetchTypes.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.fetchSeverity = this.fetchSeverity.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);
    this.fetchPriority = this.fetchPriority.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.fetchStatus = this.fetchStatus.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.fetchFoundIn = this.fetchFoundIn.bind(this);
    this.onChangeFoundIn = this.onChangeFoundIn.bind(this);
    this.fetchFixedIn = this.fetchFixedIn.bind(this);
    this.onChangeFixedIn = this.onChangeFixedIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchStatus() {
    var _this = this;
    axios
      .get(API_BASE_URL_PRODUCT + "/defectstatuses", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response);
        _this.setState({ defectStatus: response.data });
        console.log(_this.state.defectStatus);
      });
  }

  componentDidMount() {

    console.log("mounting");

    this.getAllEmployees();
    this.fetchProjects();
    this.fetchModules();
    this.fetchTypes();
    this.fetchSeverity();
    this.fetchPriority();
    this.fetchStatus();
    this.fetchFoundIn();
    this.fetchFixedIn();
  }

  fetchFoundIn() {
    var _this = this;
    axios
      .get(API_BASE_URL + "/releases", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response);
        _this.setState({ defectfoundIn: response.data });
        console.log(_this.state.defectfoundIn);
      });
  }

  fetchFixedIn() {
    var _this = this;
    axios
      .get(API_BASE_URL + "/releases", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response);
        _this.setState({ defectfixedIn: response.data });
        console.log(_this.state.defectfixedIn);
      });
  }

  fetchSeverity() {
    var _this = this;
    axios
      .get(API_BASE_URL_PRODUCT + "/Severitys", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {

        console.log(response.data);
        _this.setState({ defectSeverity: response.data });
        console.log(_this.state.defectSeverity);
      });
  }

  fetchPriority() {
    var _this = this;
    axios
      .get(API_BASE_URL_PRODUCT + "/defectpriorities", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {

        console.log(response.data);
        _this.setState({ defectPriority: response.data });
        console.log(_this.state.defectPriority);
      });
  }

  fetchTypes() {
    var _this = this;
    axios
      .get(API_BASE_URL_PRODUCT + "/defecttypes", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {

        // handle success
        console.log(response);
        _this.setState({ defectTypes: response.data });
        console.log(_this.state.defectTypes);
      });
  }

  fetchProjects() {
    var _this = this;
    axios
      .get(API_BASE_URL + "/GetAllproject", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({ projects: response.data });
        console.log(_this.state.projects);
      });
  }

  onChangeProjects(value, defaultValue) {

    this.setState({
      projectId: `${value}`
    });
    console.log(value);
    console.log(defaultValue);
    var _this = this;
    if (value == "All") {
      this.refreshDefect()
    } else {
      axios
        .get(API_BASE_URL + "/getAllDefectsByProjectId/" + value, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
        .then(function (response) {
          console.log(response.data)
          _this.setState({
            defect: response.data,

          })
        });
    }
  }
  fetchModules() {
    var _this = this;
    axios
      .get(API_BASE_URL + "/FindallMain", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({ modules: response.data });
        console.log(_this.state.modules);
      });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };


  onChangeDefectId(e) {
    this.setState({
      defectId: e.target.value
    });
  }
  onChangeType(value) {
    this.setState({
      type: `${value}`
    });
    console.log(this.state.type);
  }
  onChangeFoundIn(value) {
    this.setState({
      foundIn: `${value}`
    });
    console.log(this.state.foundIn);
  }
  onChangeFixedIn(value) {
    this.setState({
      fixedIn: `${value}`
    });
    console.log(this.state.fixedIn);
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
  onChangeAbbre(e) {
    this.setState({
      abbre: e.target.value
    });
  }
  onChangeProject(value) {
    this.setState({
      projectId: `${value}`,
      assproid: `${value}`
    });
    var _this = this;
    axios
      .get(API_BASE_URL + '/getallresource', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log("hhhhhhhhhhhhhhlllllllll" + response.data);
        let assignToopt = response.data.map((post, index) => {
          if ((_this.state.projectId == post.projectId) && ("Developer" == (post.designationname))) {
            console.log("hhghjghg");
            return <Option key={index} value={post.name}>{post.name}</Option>
          }
        });

        _this.setState({ assignToopt });
        // handle success
        console.log(response.data);

      });
    console.log(_this.state.projectId);
  }



  onChangeDefectDescription(e) {
    this.setState({
      defectDescription: e.target.value
    });
  }

  onChangeDefectFixedDate(e) {
    this.setState({
      fixDate: e.target.value
    });
  }

  onChangeStepsToRecreate(e) {
    this.setState({
      stepsToRecreate: e.target.value
    });
  }
  onChangeAssignTo(e) {
    this.setState({
      assignTo: e.target.value
    });

    console.log(this.state.assignTo)
  }
  onChangeReassignTo(e) {
    this.setState({
      reassignTo: e.target.value
    });
  }
  onChangeEnteredBy(e) {
    this.setState({
      enteredBy: e.target.value
    });
  }
  onChangeFixedBy(e) {
    this.setState({
      fixedBy: e.target.value
    });
  }
  onChangeAvailableIn(e) {
    this.setState({
      availableIn: e.target.value
    });
  }
  // onChangeFoundIn(e) {
  //   this.setState({
  //     foundIn: e.target.value
  //   });
  // }
  // onChangeFixedIn(e) {
  //   this.setState({
  //     fixedIn: e.target.value
  //   });
  // }
  onChangeDateAndTime(e) {
    this.setState({
      dateAndTime: e.target.value
    });
  }



  handleOk = (e, defectId) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
      console.log(defectId);
      const obj = {
        defectId: this.state.defectId,
        defectAbbr: this.state.defectAbbr,
        type: this.state.type,
        moduleId: this.state.moduleId,
        abbre: this.state.abbre,
        projectId: this.state.projectId,
        priority: this.state.priority,
        severity: this.state.severity,
        status: this.state.status,
        defectDescription: this.state.defectDescription,
        stepsToRecreate: this.state.stepsToRecreate,
        assignTo: this.state.assignTo,
        reassignTo: this.state.reassignTo,
        enteredBy: this.state.enteredBy,
        fixedBy: this.state.fixedBy,
        availableIn: this.state.availableIn,
        foundIn: this.state.foundIn,
        fixedIn: this.state.fixedIn,
        dateAndTime: this.state.dateAndTime,
      };
      axios
        .put(API_BASE_URL + "/updateDefect/" + defectId, obj, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
        .then(response => { this.getAllDefect() });
      this.setState({
        defectId: "",
        type: "",
        moduleId: "",
        abbre: "",
        projectId: "",
        priority: "",
        severity: "",
        status: "",
        defectDescription: "",
        stepsToRecreate: "",
        assignTo: "",
        reassignTo: "",
        enteredBy: "",
        fixedBy: "",
        availableIn: "",
        foundIn: "",
        fixedIn: "",
        dateAndTime: "",


        visible: false
      });
      message.success("Updated Successfully")

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

  };
  handleCancel = e => {
    console.log(e);

    this.setState({
      visible: false
    });
  };

  //fetching the employee with get all employee
  async getAllEmployees() {
    const url = API_BASE_URL + "/getAllDefects";
    const response = await fetch(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } });
    const data = await response.json();
    console.log(data);
    this.setState({
      employees: data
    });
    console.log(this.state.employees);
  }



  handlechange = (e, pagination, filters, sorter) => {

    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "defectDescription":
        if (!NameRegex.test(value)) {
          formerrors.defectDescription = "Invalid Description";
        } else if (value.length > 30) {
          formerrors.defectDescription = "Should be less than 30 characters";
        } else {
          formerrors.defectDescription = "";
        }
      case "stepsToRecreate":
        if (!ValidRegex.test(value)) {
          formerrors.stepsToRecreate = "Invalid Step to Recreate";
        } else if (value.length > 30) {
          formerrors.stepsToRecreate = "Should be less than 30 characters";
        } else {
          formerrors.stepsToRecreate = "";
        }
      default:
        break;
    }
    this.setState({ formerrors, [name]: value }, () => console.log(this.state));

    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  handleEdit = (defectId, projectId) => {
    this.onChangeProject(projectId)
    this.showModal();
    console.log(projectId);
    console.log(defectId);
    this.setState({
      defectId: defectId
    });
    axios
      .get(API_BASE_URL + "/getDefectById/" + defectId, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(response => {
        console.log(response);
        this.setState({
          defectId: response.data.defectId,
          defectAbbr: response.data.defectAbbr,
          type: response.data.type,
          moduleId: response.data.moduleId,
          abbre: response.data.abbre,
          projectId: response.data.projectId,
          priority: response.data.priority,
          severity: response.data.severity,
          status: response.data.status,
          defectDescription: response.data.defectDescription,
          stepsToRecreate: response.data.stepsToRecreate,
          assignTo: response.data.assignTo,
          reassignTo: response.data.reassignTo,
          enteredBy: response.data.enteredBy,
          fixedBy: response.data.fixedBy,
          availableIn: response.data.availableIn,
          foundIn: response.data.foundIn,
          fixedIn: response.data.fixedIn,
          dateAndTime: response.data.dateAndTime,
          afterassignTo: response.data.assignTo,
          afterpriority: response.data.priority,
          afterseverity: response.data.severity,
          afterstatus: response.data.status,
          aftertype: response.data.type
        });


        let datalist = [];
        datalist.push(response.data.assignTo)

        this.setState({ datalist: datalist })
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(this.state.datalist)
  };

  onChange2 = e => {
    this.setState({
      comments: e.target.value
    });
  };
  attachment = id => {
    axios
      .get(API_BASE_URL + "/listFile/" + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
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






  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  onSubmit(e) {
    //e.preventDefault();
    const commentsu = {
      comments: this.state.comments,
      defectId: this.state.defectId
    };
    //var myJSON = JSON.stringify(commentsu);
    console.log(commentsu);
    if (this.state.count < 5) {
      axios
        .post(API_BASE_URL + "/comments", commentsu, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.getComment(this.state.defectId);
        });
      this.setState({
        comments: "",
        count: this.state.count + 1
      });
    } else {
      // message.error("Can't add more than 5 comments");
    }
  }



  componentWillMount() {
    this.getAllDefect();
  }

  refreshDefect() {
    axios
      .get(API_BASE_URL + "/getAllDefects", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(response => {
        console.warn("Refresh Service is working");
        this.setState({
          defect: response.data,
          Alldefect: response.data
        });
      });
  }

  refresh = () => {
    this.forceUpdate();
  };

  onChange1 = value => {
    console.log(`selected ${value}`);

    console.log(this.state.audit);
  };
  onBlur() {
    console.log("blur");
  }
  onFocus() {
    console.log("focus");
  }
  onSearch(val) {
    console.log("search:", val);
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  showModal1 = () => {
    this.setState({
      visible1: true
    });
  };
  showModalView = (defectId) => {
    var id = "Def001";
    console.log(defectId)
    this.setState({
      addAttachment: {
        name: "files",
        action:
          API_BASE_URL + "/uploadMultipleFiles?defectId=" +
          defectId,
        headers: {
          authorization: "authorization-text"
        },
        multiple: true
      }
    });
    console.log(this.state.addAttachment);
    this.getComment(id);
    this.setState({
      showModalView: true,
      defectId: id,
      comments: "",
      images: []
    });

  };

  handleOk = (e) => {

    this.onSubmit();
    const defectList = {
      defectId: this.state.defectId,
      defectAbbr: this.state.defectAbbr,
      moduleId: this.state.moduleId,
      projectId: this.state.projectId,
      severity: this.state.severity,
      priority: this.state.priority,
      type: this.state.type,
      status: this.state.status,
      fixedIn: this.state.fixedIn,
      abbre: "abbre",
      defectDescription: this.state.defectDescription,
      stepsToRecreate: this.state.stepsToRecreate,
      assignTo: this.state.assignTo,
      reassignTo: "Reassign",
      enteredBy: this.state.enteredBy,
      fixedBy: "fixed",
      availableIn: " availableIn ",
      foundIn: this.state.foundIn,
      dateAndTime: this.state.dateAndTime
    };

    console.log("dddddddddddddddddddd" + defectList);
    axios
      .post(API_BASE_URL + "/saveDefect", defectList, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(res => {
        this.getdefectStatus();
        console.log(res.data);

        if (this.state.afterstatus === res.data.status) {
          this.setState({
            befostatus: "Unchanged"
          })
        } else {
          this.setState({
            befostatus: this.state.afterstatus + " to " + res.data.status
          })
        }

        if (this.state.afterassignTo === res.data.assignTo) {
          this.setState({
            befoassignTo: "Unchanged"
          })
        } else {
          this.setState({
            befoassignTo: this.state.afterassignTo + " to " + res.data.assignTo
          })
        }
        if (this.state.afterpriority === res.data.priority) {
          this.setState({
            befopriority: "Unchanged"
          })
        } else {
          this.setState({
            befopriority: this.state.afterpriority + " to " + res.data.priority
          })
        }
        if (this.state.afterseverity === res.data.severity) {
          this.setState({
            befoseverity: "Unchanged"
          })
        } else {
          this.setState({
            befoseverity: this.state.afterseverity + " to " + res.data.severity
          })
        }
        if (this.state.aftertype === res.data.type) {
          this.setState({
            befotype: "Unchanged"
          })
        } else {
          this.setState({
            befotype: this.state.aftertype + " to " + res.data.type
          })
        }
        const auditinfo = {
          status: this.state.befostatus,
          user: localStorage.getItem(CURRENT_USER),
          defectId: res.data.defectId,
          type: this.state.befotype,
          severity: this.state.befoseverity,
          priority: this.state.befopriority,
          reassignTo: this.state.befoassignTo
        };
        axios
          .post(API_BASE_URL + "/audit", auditinfo, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
          .then(res => {

            console.log(res.data);
          })


      });

    console.log(this.state.emailnoti);
    var mail = this.state.emailnoti;
    console.log(mail);
    axios
      .post(API_BASE_URL_EMP + "/sendmail", mail, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(res => {

        console.log(res.data);
      });
    this.setState({
      visible: false
    });
    this.setState({
      defectId: "",
      moduleId: "",
      projectId: "",
      severity: "",
      priority: "",
      type: "",
      status: "",
      fixedIn: "",
      abbre: "",
      defectDescription: "",
      stepsToRecreate: "",
      assignTo: "",
      reassignTo: "",
      enteredBy: "",
      fixedBy: "",
      availableIn: "  ",
      foundIn: "",
      dateAndTime: "",
      befostatus: '',
      befoassignTo: '',
      befopriority: '',
      befoseverity: '',
      befotype: '',


      visible1: false
    });



    // const auditinfo = {
    //   status:this.state.befostatus  + " is Status changes to " + this.state.status,
    //   user: "romi",
    //   defectId: this.state.defectId,
    //   type:"type  changes to " + this.state.type,
    //   severity:"severity changes to " + this.state.severity,
    //   priority:"priority changes to " + this.state.priority,
    //   reassignTo:"defect changes to " + this.state.assignTo
    // };
  };

  handleOkView = e => {
    console.log(e);
    axios
      .post(API_BASE_URL + "/audit/", this.state.audit, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });

    this.setState({
      showModalView: false,
      defectId: ""
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };
  handleCancelView = e => {
    console.log(e);
    this.setState({
      showModalView: false,
      defectId: ""
    });
  };
  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age"
      }
    });
  };
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow()
          },
          ...this.state.comments
        ]
      });
    }, 1000);
  };

  handleChangeState = event => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    this.setState({
      [inputName]: inputValue
    });
  };
  handleChangeSeverity = value => {
    this.setState({ severity: value });
  };



  handleChangePriority = value => {
    this.setState({ priority: value });
  };

  handleChangeType = value => {
    this.setState({ type: value });
  };
  handleChangeStatus = value => {
    this.setState({ status: value });
  };
  // handleChangeDefectDescription= value => {
  //   this.setState({ defectDescription: value });
  // };
  handleChangeFoundIn = value => {
    this.setState({ foundIn: value });
  };

  handleChangeDateandTime = value => {
    this.setState({ dateAndTime: value })
  }

  handleChnagedefectAbbr = value => {
    this.setState({ defectAbbr: value })
  }
  // handleChangeFixedIn = value => {
  //    this.setState({ type: value });
  //};

  handleChangeAssignTo = value => {
    this.setState({
      assignTo: value,
      assin: this.state.assignTo
    });
    console.log(this.state.assin)
    this.reassinNoti(value);
  };


  remove = id => {
    console.log(id);
    fetch(API_BASE_URL + "/delete/" + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } }, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.getComment(this.state.defectId);
      })
      .catch(err => err);
    message.success("Comment Successfully Deleted");
  };
  // componentDidMount() {
  //   this.getComment();
  // }
  reassinNoti = (value) => {
    axios
      .get(API_BASE_URL_EMP + "/getallemployee", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
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
          subject: "This defect assign",
          text: "check"
        };
        this.setState({ emailnoti })
        console.log(this.state.assignTo);

      })
      .catch(function (error) {
        console.log(error);
      });



  }


  getComment = id => {
    axios
      .get(API_BASE_URL + "/comments/" + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(resp => {
        let Data = resp.data;
        this.setState({ count: Data.length });
        let comment = Data.map(e => {
          // return <div><p>{e.comments}</p></div>
          return (
            <table style={{ border: "2px" }}>
              <tr key={e.id}>
                <td
                  style={{
                    width: "300px",
                    wordWrap: "break-word",
                    maxWidth: "250px"
                    //wordBreak: "break-all"
                  }}
                >
                  {e.comments}
                </td>
                <td>
                  {/* <Icon type="minus-circle" style={{ color: 'red' }} onClick={() => this.remove(e.commentId)} /> */}
                  {/* <Button size="sm" color="danger" onClick={() => this.remove(e.commentId)}>Delete</Button> */}
                  <Popconfirm
                    title="Are you sure want to delete this Entry ?"
                    icon={
                      <Icon
                        type="question-circle-o"
                        style={{
                          color: "red"
                        }}
                      />
                    }
                    onConfirm={() => this.remove(e.commentId)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">
                      <Icon type="minus-circle" style={{ color: "red" }} />
                    </a>
                  </Popconfirm>
                </td>
              </tr>
            </table>
          );
        });
        this.setState({ comment });
        console.log(comment);
      });
  };

  Preloader(props) {
    return <img src="spinner.gif" />;
  }

  //Getting All defect details
  getdefectStatus = () => {
    const url = API_BASE_URL + "/getAllDefects";
    axios
      .get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(response =>
        this.setState({
          defect: response.data
        })
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.getdefectStatus();
  }

  //Deleting defect details
  handleDelete = defectId => {
    axios
      .delete(API_BASE_URL + "/deleteDefect/" + defectId, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(console.log(defectId))
      .catch(err => console.log(err));

    const defect = this.state.defect.filter(defect => {
      return defect.defectId !== defectId;
    });
    this.setState({
      defect
    });
  };
  //fetching the employee with get all employee
  getAllDefect = () => {

    const _this = this;

    axios
      .get(API_BASE_URL + "/getAllDefects", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response);

        var data = response.data;
        console.log("gjhgjhg" + response.data.length);
        for (let a = 0; a < data.length; a++) {
          _this.state.defect.push({
            defectId: data[a].defectId,
            projectName: data[a].projectName,
            moduleName: data[a].moduleName,
            severity: data[a].severity,
            priority: data[a].priority,
            type: data[a].type,
            foundIn: data[a].foundIn,
            status: data[a].status
          });
        }
        console.log(this.state.defect);
        alert(this.state.defect.length)
      });

    this.setState({
      state: this.state,

    });
  };
  handleMore = (defectId) => {
    this.showModalView(defectId);
    console.log(defectId);
    this.setState({ defid: defectId })

    axios
      .get(API_BASE_URL + "/getDefectById/" + defectId, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(response => {
        console.log(response);
        this.setState({
          // employeeautoId: response.data.empId,
          defectId: response.data.defectId,
          defectAbbr: response.data.defectAbbr,
          type: response.data.type,
          moduleId: response.data.moduleName,
          abbre: response.data.abbre,
          projectId: response.data.projectName,
          priority: response.data.priority,
          severity: response.data.severity,
          status: response.data.status,
          defectDescription: response.data.defectDescription,
          stepsToRecreate: response.data.stepsToRecreate,
          assignTo: response.data.assignTo,
          reassignTo: response.data.reassignTo,
          enteredBy: response.data.enteredBy,
          fixedBy: response.data.fixedBy,
          availableIn: response.data.availableIn,
          foundIn: response.data.foundIn,
          fixedIn: response.data.fixedIn,
          dateAndTime: response.data.dateAndTime,
          fixDate: response.data.fixDate
          //employeeFirstName:response.data.firstname,
          // employeeDesignation: response.data.designationid,
          //employeeEmail: response.data.email
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(this.state.type)
  }

  openmore = (record) => {
    console.log(record)
    this.setState({
      showModalView: true
    });
  }

  render() {
    const departureValidationMessage = 'Please select a departure country!';
    const { formerrors } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { photoIndex, isOpen, images } = this.state;
    const { comments, submitting, value, defect } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Defect Id",
        dataIndex: "defectAbbr",
        key: "defectAbbr",
        width: "60px",
        //filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        //filteredValue: filteredInfo.defectId || null,
        //onFilter: (value, record) => record.defectId.includes(value),
        //sorter: (a, b) => a.defectId.length - b.defectId.length,
        //sortOrder: sortedInfo.columnKey === "defectId" && sortedInfo.order
      },

      {
        title: "Module Name",
        dataIndex: "moduleName",
        key: "moduleName",
        width: "150px",
        filters: [
          { text: "Login", value: "login" },
          { text: "Defect", value: "defect" },

        ],

        filteredValue: filteredInfo.moduleName || null,
        onFilter: (value, record) => record.moduleName.includes(value),

      },
      {
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
        width: "110px",
        filters: [
          { text: "High", value: "High" },
          { text: "Medium", value: "Medium" },
          { text: "Low", value: "Low" }
        ],
        filteredValue: filteredInfo.severity || null,
        onFilter: (value, record) => record.severity.includes(value)
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        width: "110px",
        filters: [
          { text: "High", value: "High" },
          { text: "Medium", value: "Medium" },
          { text: "Low", value: "Low" }
        ],
        filteredValue: filteredInfo.priority || null,
        onFilter: (value, record) => record.priority.includes(value)

      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "150px",
        filters: [
          { text: "Open", value: "Open" },
          { text: "Re-opened", value: "Re-opened" },
          { text: "Defrred", value: "Defrred" }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),

      },
      {
        title: "Assign To",
        dataIndex: "assignTo",
        key: "assignTo",
        width: "150px",
        filters: [
          { text: "Release1", value: "Release1" },
          { text: "Release2", value: "Release2" },
          { text: "Release3", value: "Release3" }
        ],
        filteredValue: filteredInfo.fixedIn || null,
        onFilter: (value, record) => record.status.includes(value),

      },


      {
        title: "Action",
        key: "action",
        width: "150px",
        render: (text, data = this.state.defect, record) => (
          <span>
            <Icon
              id="edit"
              type="edit"
              onClick={this.handleEdit.bind(this, data.defectId, data.projectId)}
              style={{ fontSize: "18px", color: "green" }}
            />


            <Popconfirm
              title="Are you sure want to delete this Entry ?"
              icon={
                <Icon
                  type="question-circle-o"
                  style={{
                    color: "red"
                  }}
                />
              }
              onConfirm={this.handleDelete.bind(this, data.defectId)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">
                {/* <Icon
                id="delete"
                  type="delete"
                  style={{
                    color: "red",
                    fontSize: "18px"
                  }}

                // onClick={() => this.handleDelete(data.defectId)}
                /> */}
              </a>
            </Popconfirm>

          </span>
        )
      },
      {
        title: "More",
        key: "more",
        width: "120px",
        render: (text, data = this.state.defect, record) => (
          <span>
            <Icon
              id="More"
              type="arrows-alt"
              style={{ fontSize: "18px", color: "green" }}
              onClick={this.handleMore.bind(this, data.defectId)}
            // onClick={this.showModalView.bind(this, data.defectId)}
            />
          </span>
        )
      },
      {
        title: "History",
        key: "history",
        width: "120px",
        render: (text, data = this.state.defect, record) => (
          <span>
            <DefectLog id={data.defectId} />
            {/* <Icon
            id="History"
              type="arrows-alt"
              style={{ fontSize: "18px", color: "green" }}
              onClick={this.handleMore.bind(this, data.defectId)}
            // onClick={this.showModalView.bind(this, data.defectId)}
            /> */}
          </span>
        )
      },
      {

      }
    ];

    return (
      <div>
        <EditorIn />
        <Row>
          <Col span={4}>
            <DefectAdd />
          </Col>
          <Col span={8}>

          </Col>
          <Col span={7}>

          </Col>
          <Col span={5}>
            <Select
              placeholder="Select the Project"
              style={{ width: 220 }}
              defaultValue="All"
              onChange={this.onChangeProjects}

            >
              <Option value="All">All</Option>

              {this.state.projects.map(function (item, index) {
                return (
                  <Option key={index} defaultValue="All" value={item.projectId}>
                    {item.projectName}
                  </Option>
                );
              })}
              {/* <Option value="jack">Jack (100)</Option>
          <Option value="lucy">Lucy (101)</Option> */}
            </Select>
          </Col>

        </Row>

        <br />
        <br />


        <Table
          columns={columns}
          dataSource={this.state.defect}
          onChange={this.handleChange}
          // expandRowByClick={(e)=>this.openmore(e)}
          pagination={{
            total: this.state.Total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            pageSize: 10,
            showSizeChanger: true,



            // showQuickJumper: true
          }}

          onRow={(record, rowIndex) => {
            return {
              // onClick: () => {this.handleMore(record.defectId)}, // click row
              onDoubleClick: () => { this.handleMore(record.defectId) }, // double click row
              // onContextMenu: event => {}, // right button click row
              //  onMouseEnter: () => {this.handleMore(record.defectId)}, // mouse enter row
              // onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />





        {/* Edit Defects Part  */}

        <Modal
          title="Edit Defects"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this, this.state.defectId)}
          onCancel={this.handleCancel}
          width="600px"
        >
          <Form>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Defect Id">
                  <Input
                    id="defectAbbr"
                    placeholder="Defect Id"
                    value={this.state.defectAbbr}
                    name="defectAbbr"
                    type="text"
                    onChange={this.handlechange}

                  />
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Project">
                  <Select
                    id="Project"
                    placeholder="Project "
                    defaultValue="Select Project"
                    //style={{ width: 120 }}
                    onChange={this.onChangeProject}
                    value={this.state.projectId}
                    disabled
                  >
                    {this.state.projects.map(function (item, index) {
                      return (
                        <Option key={index} value={item.projectId}>
                          {item.projectName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Module">
                  <Select
                    id="Module"
                    placeholder="Module "
                    defaultValue="Select Module"
                    //style={{ width: 120 }}
                    onChange={this.onChangeModule}
                    value={this.state.moduleId}
                  >
                    {this.state.modules.map(function (item, index) {
                      return (
                        <Option key={index} value={item.moduleId}>
                          {item.moduleName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} style={{ padding: "5px" }}>
                <Form.Item label="Defect Description">
                  <TextArea
                    id="defectDescription"
                    placeholder="Defect Description"
                    className={
                      formerrors.defectDescription.length > 0 ? "error" : null
                    }
                    value={this.state.defectDescription}
                    onChange={this.handlechange}
                    name="defectDescription"
                    type="text"
                  />
                  {formerrors.defectDescription.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.defectDescription}
                    </span>
                  )}
                </Form.Item>
              </Col>
              <Col span={24} style={{ padding: "5px" }}>
                <Form.Item label="Steps To Recreate ">
                  <TextArea
                    id="stepsToRecreate"
                    placeholder="Defect Step to Recreate"
                    className={
                      formerrors.stepsToRecreate.length > 0 ? "error" : null
                    }
                    value={this.state.stepsToRecreate}
                    onChange={this.handlechange}
                    name="stepsToRecreate"
                    type="text"
                  />
                  {formerrors.stepsToRecreate.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.stepsToRecreate}
                    </span>
                  )}
                </Form.Item>
              </Col>

              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Entered By">
                  <Select


                    id="enteredBy"
                    placeholder="Entered By"
                    //  value={this.state.enteredBy}
                    onChange={this.handleChangeEnterrdBy}
                    name="enteredBy"
                    type="text"
                    value={this.state.enteredBy}
                    disabled
                  >
                    {/* <Option value="user1">User 1</Option>
                    <Option value="user2">User 2</Option>
                    <Option value="user3">User 3</Option> */}
                  </Select>



                </Form.Item>
              </Col>


              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Found In ">
                  <Select
                    id="foundIn"
                    placeholder="Found In "
                    value={this.state.foundIn}
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
                <Form.Item label="Status">
                  <Select
                    id="Status"
                    placeholder="Status"
                    //defaultValue={"Medium"}
                    //style={{ width: 120 }}
                    value={this.state.status}
                    onChange={this.onChangeStatus}
                  >
                    {this.state.defectStatus.map(function (item, index) {
                      return (
                        <Option key={index} value={item.name}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

            </Row>

            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Type">
                  <Select
                    id="type"
                    placeholder="Type "
                    defaultValue={this.state.type}
                    value={this.state.type}
                    //style={{ width: 120 }}
                    // name={this.state.type}
                    onChange={this.onChangeType}
                  >
                    {this.state.defectTypes.map(function (item, index) {
                      return (
                        <Option key={index} value={item.name}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Severity">
                  <Select
                    id="Severity"
                    placeholder="Severity "
                    // defaultValue="Select Severity"
                    //style={{ width: 120 }}
                    value={this.state.severity}
                    onChange={this.onChangeSeverity}
                  >
                    {this.state.defectSeverity.map(function (item, index) {
                      return (
                        <Option key={index} value={item.name}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Priority">
                  <Select
                    id="Priority"
                    placeholder="Priority"
                    //defaultValue={"Medium"}
                    //style={{ width: 120 }}
                    value={this.state.priority}
                    onChange={this.onChangePriority}
                  >
                    {this.state.defectPriority.map(function (item, index) {
                      return (
                        <Option key={index} value={item.name}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                {localStorage.getItem(ROLE_NAME) === 'ROLE_QA' ?
                  <Form.Item label="Assign To">
                    <Select
                      id="assignTo"
                      placeholder="Assign To"
                      name="assignTo"
                      type="text"
                      value={this.state.assignTo}
                      onChange={this.handleChangeAssignTo}
                    >
                      {this.state.assignToopt}
                      {/* <Option value="user1">User 1</Option>
                    <Option value="user2">User 2</Option>
                    <Option value="user3">User 3</Option> */}
                    </Select>

                  </Form.Item> : <Form.Item label="Re Assign To">
                    <Select
                      id="assignTo"
                      placeholder="ReAssign To"
                      // value={this.state.assignTo}
                      // onChange={this.handlechange}
                      name="assignTo"
                      type="text"
                      value={this.state.assignTo}
                      onChange={this.handleChangeAssignTo}
                    >
                      {this.state.assignToopt}
                      {/* <Option value="user1">User 1</Option>
                    <Option value="user2">User 2</Option>
                    <Option value="user3">User 3</Option> */}
                    </Select>

                  </Form.Item>}
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Fixed In ">
                  <Select

                    id="fixedIn"
                    placeholder="Fixed In "
                    //value={this.state.foundIn}
                    //onChange={this.handlechange}
                    //  name="foundIn"
                    type="text"
                    value={this.state.fixedIn}
                    onChange={this.onChangeFixedIn}

                  >
                    {this.state.defectfixedIn.map(function (item, index) {
                      return (
                        <Option key={index} value={item.releaseName}>
                          {item.releaseName}
                        </Option>
                      );
                    })}
                  </Select>



                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Modal>
        {/* More Details View */}
        <Modal
          title="More Details"
          visible={this.state.showModalView}
          onOk={this.handleOkView}
          onCancel={this.handleCancelView}
          width="600px"
        >

          <Row>
            <Col span={12}>
              <p>
                <b>Defect ID:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.defectAbbr}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Project Name:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.projectId}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Module Name:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.moduleId}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Description:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.defectDescription}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Steps to Recreate:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.stepsToRecreate}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Severity:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>
                {this.state.severity}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Priority:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>
                {this.state.priority}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Defect Type:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.type}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Found In:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.foundIn}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Fixed In:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.fixedIn}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Entered By:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.enteredBy}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Entered Date:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.dateAndTime}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Assigned To:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.assignTo}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Fixed By:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.fixedBy}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p>
                <b>Available Date:</b>
              </p>
            </Col>
            <Col span={12}>
              <p>{this.state.availableIn}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>

              <p>
                <b>Status:</b>
              </p>
            </Col>
            <Col span={12}>
              <p> {this.state.status}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <p><b>Updated Date and Time:</b></p>
            </Col>
            <Col span={12}>
              <p>{this.state.fixDate}</p>
            </Col>
          </Row>

          {/* <Row>
            <Col span={10} style={{ padding: "5px" }}>
              <Button
              id=" ViewAttachments"
                type="primary"
                onClick={() => this.attachment(this.state.defectId)}
              >
                View Attachments
              </Button>
              {isOpen && (
                <Lightbox
                  mainSrc={this.state.images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex:
                        (photoIndex + images.length - 1) % images.length
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % images.length
                    })
                  }
                />
              )}
            </Col>

            <Col span={14} style={{ padding: "5px" }}>
              <Upload {...this.state.addAttachment}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </Col>
          </Row> */}
          {/* <Divider /> */}
          {/* <h3>Comments</h3> */}
          {/* {comments.length > 0 && <CommentList comments={comments} />} */}
          {/* <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.onChange2}
                onSubmit={this.onSubmit}
                submitting={submitting}
                value={this.state.comments}
                name="comments"
              />
            }
          /> */}
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

export default Form.create()(TableFilter);