import {
  Table,
  Input,
  Button,
  Icon,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Popconfirm,
  notification,
  message
} from "antd";
import Highlighter from "react-highlight-words";
import React from "react";
import axios from "axios";
import { API_BASE_URL_EMP, API_BASE_URL, ACCESS_TOKEN } from '../../constants/index';
import Profile from './Profile';
import ProfileScreen from '../SettingComponent/ProfileScreen';
import EmployeeAddModal from "./EmployeeAddModal";
import ImportEmployee from "./ImportEmployee";

const { Option } = Select;

function confirm(e) {
  console.log(e);
  message.success("Successfully Deleted");
}

function cancel(e) {
  console.log(e);
}

function onChange(sorter) {
  console.log("params", sorter);
}

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'This is Warning Message',
    description:
      "This is the contain Valuable Data.If You delete this all data can't retrive!!!!",
  });
};

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeFirstName = this.onChangeEmployeeFirstName.bind(this);
    this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
    this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.fetchDesignations = this.fetchDesignations.bind(this);
    this.handlechange = this.handlechange.bind(this);

    this.state = {
      employeeautoId: "",
      employeeId: "",
      employeeName: "",
      employeeFirstName: "",
      employeeDesignation: "",
      employeeEmail: "",
      Name: '',
      Email: '',
      designationid: '',
      designationname: '',
      Designationname: '',
      visible1: false,
      visiblepro: false,

      bench: "",
      projectName: "",
      availability: "",
      profilePicPath: ''
    };

    this.state = {
      searchText: "",
      employees: [],
      patients: [],
      Total: "",
      formerrors: {
        employeeId: "",
        employeeName: "",
        employeeFirstName: "",
        employeeEmail: ""
      },
    };
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value
    });
  }
  onChangeEmployeeName(e) {
    this.setState({
      employeeName: e.target.value
    });
  }

  onChangeEmployeeFirstName(e) {
    this.setState({
      employeeFirstName: e.target.value
    });
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    console.log(this.state.employeeDesignation);
  }

  onChangeEmployeeEmail(e) {
    this.setState({
      employeeEmail: e.target.value
    });
  }

  state1 = {
    filteredInfo: null,
    sortedInfo: null
  };

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  componentDidMount() {
    this.fetchDesignations();
    console.log("mounting");
    this.getAllEmployees();
    this.getTotalEmployee();
  }

  fetchDesignations() {
    var _this = this;
    axios
      .get(API_BASE_URL_EMP + "/getAllDesignation", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        let des = response.data.map(function (item, index) {
          return (
            <Option key={index} value={item.designationid}>
              {item.designationname}
            </Option>
          );
        });
        console.log(response.data);
        _this.setState({ des: des });

      });
  }

  handleOk = empId => {
    console.log(empId);
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
        Employee Id: ${this.state.employeeId}
        Employee Name: ${this.state.employeeName}
        Employee FirstName:${this.state.employeeFirstName}
        Employee Email: ${this.state.employeeEmail}  
        Employee Picture: ${this.state.employeePicture}    
      `);
      const obj = {
        empId: this.state.employeeautoId,
        employeeid: this.state.employeeId,
        name: this.state.employeeName,
        firstname: this.state.employeeFirstName,
        designationid: this.state.employeeDesignation,
        email: this.state.employeeEmail
      };
      console.log(obj);
      axios
        .put(API_BASE_URL_EMP + "/update/" + empId, obj, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
        .then(response => this.getAllEmployees());
      this.setState({
        employeeautoId: "",
        employeeId: "",
        employeeName: "",
        employeeFirstName: "",
        employeeDesignation: "",
        employeeEmail: "",
        visible: false
      });

      message.success("Updated Successfully!!!");
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
  getAllEmployees = () => {

    var _this = this;
    const url = API_BASE_URL_EMP + "/getallemployee";
    axios
      .get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        _this.setState({
          employees: response.data
        });
      });

    console.log(_this.state.employees);
  }
  async getTotalEmployee() {
    const url = API_BASE_URL_EMP + "/getcount";
    const response = await fetch(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } });
    const data = await response.json();
    console.log(data);
    this.setState({
      Total: data
    });
    console.log(this.state.Total);
  }
  handleDelete = empId => {
    fetch(API_BASE_URL_EMP + "/deletebyid/" + empId, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } }, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
    console.log(empId);
    confirm(empId);
    const employees = this.state.employees.filter(employees => {
      return employees.empId !== empId;
    });
    this.setState({
      employees
    });
  };

  handlechange = (e, pagination, filters, sorter) => {

    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "employeeId":
        if (!ValidRegex.test(value)) {
          formerrors.employeeId = "Invalid Id";
        } else if (value.length > 8) {
          formerrors.employeeId = "Should be less than 8 characters";
        } else if (value.length < 2) {
          formerrors.employeeId = "Should be greater than 2 characters";
        } else {
          formerrors.employeeId = "";
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
      case "employeeFirstName":
        if (!NameRegex.test(value)) {
          formerrors.employeeFirstName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.employeeFirstName = "Should be less than 30 characters";
        } else {
          formerrors.employeeFirstName = "";
        }
        break;
      case "employeeEmail":
        formerrors.employeeEmail = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
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

  handleEdit = empId => {
    this.showModal();
    console.log(empId);
    this.setState({
      empId: empId
    });
    axios
      .get(API_BASE_URL_EMP + "/getempolyeebyid/" + empId, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(response => {
        console.log(response);
        this.setState({
          employeeautoId: response.data.empId,
          employeeId: response.data.employeeid,
          employeeName: response.data.name,
          employeeFirstName: response.data.firstname,
          employeeDesignation: response.data.designationid,
          employeeEmail: response.data.email,

        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
        <div style={{ padding: 8 }}>
          <Input

            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            id="search"
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
        </Button>
          <Button
            id="reset"
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
        </Button>
        </div>
      ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  statuschange = (id) => {
    console.log(id)
    axios
      .get(API_BASE_URL + "/getemployee/" + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(resp => {
        let audit = resp.data[0];
        console.log(audit);
        if (audit) {
          this.setState({
            Name: audit.firstname,
            Email: audit.email,
            Designationname: audit.designationname,
            visible1: true
          });
        }
      });


  }

  showModalpro = (id) => {
    axios
      .get(API_BASE_URL + "/getemployee/" + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(resp => {
        let audit = resp.data[0];
        console.log(resp.data);
        if (audit) {
          this.setState({
            Name: audit.firstname,
            Email: audit.email,
            Designationname: audit.designationname,
            bench: "70%",
            projectName: audit.projectName,
            availability: audit.availability,
            profilePicPath: audit.profilePicPath,
            visiblepro: true
          });
        } else {
          axios
            .get(API_BASE_URL_EMP + "/getempolyeebyid/" + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(resp => {
              let audit = resp.data;
              this.setState({
                Name: audit.firstname,
                Email: audit.email,
                Designationname: audit.designationname,
                profilePicPath: audit.profilePicPath,
                visiblepro: true,
                bench: "Bench",
                projectName: "Not allocated",
                availability: "100%",
              })
            });
        }

      });
  };
  handleOkpro = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visiblepro: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancelpro = () => {
    console.log('Clicked cancel button');
    this.setState({
      visiblepro: false,
    });
  };


  render() {
    const { formerrors } = this.state;
    const { getFieldDecorator } = this.props.form;
    // For Table functions
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Emp Id",
        dataIndex: "employeeid",
        key: "employeeid",
        width: "10%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.employeeid.length - b.employeeid.length
      },
      {
        title: "Employee Name",
        dataIndex: "name",
        key: "name",
        width: "25%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Employee FirstName",
        dataIndex: "firstname",
        key: "firstname",
        width: "25%",
        ...this.getColumnSearchProps("firstname")
      },

      {
        title: "Designation",
        dataIndex: "designationname",
        key: "designationname",
        width: "25%",
        ...this.getColumnSearchProps("designationname")
      },

      {
        title: "Email Id",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },

      {
        title: "Edit",
        render: (text, data = this.state.patients) => (
          <a>
            <Icon
              id="edit"
              type="edit"
              onClick={this.handleEdit.bind(this, data.empId)}
              style={{ fontSize: "18px", color: "green" }}
            />
          </a>
        ),
        key: "edit",
        width: "7%"
      },
      {
        title: "Delete",
        dataIndex: "empId",
        key: "empId",
        render: (text, data = this.state.patients) => (
          <a>
            <Icon id="delete" type="delete" style={{ fontSize: "18px", color: "red" }} onClick={() => openNotificationWithIcon('warning')} />
          </a>

        ),
        key: "delete",
        width: "8%"
      }
    ];
    return (
      <React.Fragment>
         <Row gutter={16}>
                <Col span={24}>
                <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 360,
                                marginRight: '0px'
                            }}>
        <div>
          
          <Col span={4}>
            <EmployeeAddModal reload={this.getAllEmployees} />
          </Col>
          <Col span={4}>
            <ImportEmployee reload={this.getAllEmployees} />
          </Col>
          <br />
          <br />

          <Modal
            title={null}
            visible={this.state.visiblepro}
            onOk={this.handleOkpro}
            onCancel={this.handleCancelpro}
            width="600px"
            footer={null}
            headers={null}
          >
            <ProfileScreen
              Name={this.state.Name}
              Email={this.state.Email}
              Designationname={this.state.Designationname}
              bench={this.state.bench}
              projectName={this.state.projectName}
              availability={this.state.availability}
              profilePicPath={this.state.profilePicPath}

            />
          </Modal>



          <Modal
            title="Edit Employee"
            visible={this.state.visible}
            onOk={this.handleOk.bind(this, this.state.empId)}
            onCancel={this.handleCancel}
            width="500px"
          >
            <Form>
              <Row>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee Id">
                    <Input
                      id="employeeId"
                      className={
                        formerrors.employeeId.length > 0 ? "error" : null
                      }
                      placeholder="Employee Id"
                      value={this.state.employeeId}
                      name="employeeId"
                      type="text"
                      onChange={this.handlechange}
                      disabled
                    />
                    {getFieldDecorator("Value", {
          rules: [{ required: true, message: "Please input your Name!" }]
        })}
                    {/* {formerrors.employeeId.length > 0 && (
                      <span
                        className="error"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {formerrors.employeeId}
                      </span>
                    )} */}
                  </Form.Item>
                </Col>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee Name">
                 

                    <Input
                      id="employeeName"
                      className={
                        formerrors.employeeName.length > 0 ? "error" : null
                      }
                      placeholder="Employee Name"
                      value={this.state.employeeName}
                      onChange={this.handlechange}
                      name="employeeName"
                      type="text"
                    />
                     {/* {getFieldDecorator("Value", {
          rules: [{ required: true, message: "Please input your Name!" }]
        })} */}

                    {formerrors.employeeName.length > 0 && (
                      <span
                        className="error"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {formerrors.employeeName}
                      </span>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee FirstName">
                    <Input
                      id="employeeFirstName"
                      className={
                        formerrors.employeeFirstName.length > 0 ? "error" : null
                      }
                      placeholder="Employee FirstName"
                      value={this.state.employeeFirstName}
                      onChange={this.handlechange}
                      name="employeeFirstName"
                      type="text"
                    />
                    {formerrors.employeeFirstName.length > 0 && (
                      <span
                        className="error"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {formerrors.employeeFirstName}
                      </span>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Designation">
                    <Select
                      id="employeeDesignation"
                      onChange={this.onChangeEmployeeDesignation}
                      value={this.state.employeeDesignation}
                    >
                      {this.state.des}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={16} style={{ padding: "5px" }}>
                  <Form.Item label="Email Id">
                    <Input
                      id="employeeEmail"
                      className={
                        formerrors.employeeEmail.length > 0 ? "error" : null
                      }
                      placeholder="Email"
                      value={this.state.employeeEmail}
                      onChange={this.handlechange}
                      name="employeeEmail"
                      type="text"
                    />
                    {formerrors.employeeEmail.length > 0 && (
                      <span
                        className="error"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {formerrors.employeeEmail}
                      </span>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.employees}
          pagination={{
            total: this.state.Total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            pageSize: 10,
            showSizeChanger: true
          }}

          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: () => { this.showModalpro(record.empId) },
            };
          }}
        />
        </div>
        </Col>
        </Row>
      </React.Fragment>
    );
  }
  validateName = name => {
    if (name.length < 2) {
      return { validateStatus: "error", errorMsg: "Name is short." };
    }
  };
}
export default Form.create()(App);