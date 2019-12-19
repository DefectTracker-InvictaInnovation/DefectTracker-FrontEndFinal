import { Modal, Button, Select, Transfer, Switch, Table, Tag, message } from 'antd';
import React from 'react';
import axios from "axios";
import difference from 'lodash/difference';
import { API_BASE_URL_EMP, API_BASE_URL, ACCESS_TOKEN } from '../../constants/index';

const { Option, OptGroup } = Select;
const employee = []
const originTargetKeys = employee.filter(item => +item.key % 5 > 1).map(item => item.key);

const leftTableColumns = [
  {
    title: "EmpId",
    dataIndex: "employeeid",
    key: "employeeid",
  },

  {
    title: "EmpName",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "EmpFirstName",
    dataIndex: "firstname",
    key: "firstname",
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Designation",
    dataIndex: "designationname",
    key: "designationname",
  },
  {
    title: "Availability",
    dataIndex: "availability",
    key: "availability",
  },
];

const rightTableColumns = [
  {
    title: "EmpId",
    dataIndex: "employeeid",
    key: "employeeid",
  },

  {
    title: "EmpName",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "EmpFirstName",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Designation",
    dataIndex: "designationname",
    key: "designationname",
  },
  {
    title: "Availability",
    dataIndex: "availability",
    key: "availability",
  },

];


export default class PmAllocation extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      project: [],
      employee: [],
      targetKeys: originTargetKeys,
      disabled: false,
      showSearch: false,
      value1: '',
      visible1: false
    }
    this.handleOk = this.handleOk.bind(this);
  }
  state = { visible: false };

  handleChange = (value) => {
    this.setState({
      value1: value
    })
    console.log(`selected ${value}`);
  }

  onChange = e => {
    [e.target.id] = e.target.value
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidMount() {
    this.fetchProjects();
    this.fetchEmployee();
    this.fetchEmployee1();
  }

  fetchProjects() {
    var _this = this;
    axios.get(API_BASE_URL + '/GetAllproject', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response.data);
        _this.setState({ project: response.data });
        console.log(_this.state.project);

      });
  }

  fetchEmployee() {
    var _this = this;
    axios.get(API_BASE_URL + '/GetAllresources', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response.data);
        _this.setState({ employee: response.data });
        console.log(_this.state.employee);
        _this.state.employee.map((post) => {
          console.log(post.empId)
        });

      });
  }

  handleOk = () => {
    this.close();
  };

  handleCancel = () => {
    var _this = this;
    _this.setState({
      visible: false,
    })
  };


  onChange1 = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  triggerDisable = disabled => {
    this.setState({ disabled });
  };


  fetchEmployee1() {
    var _this = this;
    axios.get(API_BASE_URL + '/GetAllresources', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response.data);
        let emp = response.data
        _this.setState({ emp: emp });
        console.log(_this.state.employee);
        const list = []
        console.log("dfgdgdgd" + emp)
        response.data.map((post, index) => {
          list.push({
            key: index,
            employeeid: post.employeeid,
            name: post.name,
            firstname: post.firstname,
            email: post.email,
            designationname: post.designationname,
            availability: post.availability,
          });
          _this.setState({
            list: list
          })
        })
      });
  }
  triggerShowSearch = showSearch => {
    this.setState({ showSearch });
  };
  show = (targetKeys) => {


    var _this = this;
    console.log(targetKeys)

    console.log(_this.state.list);
    _this.state.employee.map((post, index) => {
      console.log(post.key)

      for (var i = 0; i < 11; i++) {
        if (targetKeys[i] == index) {
          console.log(post.empId)
          let data1 = {
            empId: post.empId,
            projectId: this.state.value1
          }

          this.setState = {
            data1
          }
          console.log(data1)
          axios
            .post(
              API_BASE_URL + "/saveresource",
              data1, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } }
            )
            .then(res => {
              console.log(res.data)

            }
            )
            .catch(error => {
              console.log(error);
            });

        }
      }

    });

  }

  close = () => {
    this.setState({
      visible: false,
    });
  }
  
  render() {
    const { visible, loading, targetKeys, disabled, showSearch } = this.state;

    const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
      <Transfer
        id="tableTransfer"
        {...restProps} showSelectAll={false} >

        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled
        }) => {
          const columns = direction === "left" ? leftColumns : rightColumns;

          const rowSelection = {
            getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows
                .filter(item => !item.disabled)
                .map(({ key }) => key);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);
              onItemSelectAll(diffKeys, selected);

              this.setState({ filteredItems })
            },
            onSelect({ key }, selected) {

              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys

          };

          return (

            <Table
              id="allocationTable"
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? "none" : null }}
              onRow={({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) return;
                  onItemSelect(key, !listSelectedKeys.includes(key));
                }
              })}
            />
          );
        }}
      </Transfer>
    );


    return (
      <div>
        <Button id="allocate" type="primary" onClick={this.showModal} disabled={this.props.qastatus}>
          PM Allocate
        </Button>
        <br />
        <Modal

          style={{ top: 20 }}

          visible={this.state.visible}
          title="Allocating Members for Project"
          width="99%"
          height="45%"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button id="back" key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button id="submit" key="submit" type="primary" onClick={this.handleOk} theme="filled">
              Submit
            </Button>,
          ]}
        >
          <div><Select id="projects" defaultValue="Project" style={{ width: 200 }} onChange={this.handleChange}>
            <OptGroup label="Projects">
              {this.state.project.map((item, index) => {
                return <Option key={index} value={item.projectId}> {item.projectName}</Option>
              })}
            </OptGroup>
          </Select></div>
          <br />
          <TableTransfer
            dataSource={this.state.list}
            targetKeys={targetKeys}
            disabled={disabled}
            showSearch={showSearch}
            onChange={this.onChange1}
            filterOption={(inputValue, item) =>
              item.employeeid.indexOf(inputValue) !== -1 ||
              item.name.indexOf(inputValue) !== -1 ||
              item.firstname.indexOf(inputValue) !== -1 ||
              item.email.indexOf(inputValue) !== -1 ||
              item.designationname.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
            selectedKeys={this.show(targetKeys)}
          />
          <Switch
            unCheckedChildren="showSearch"
            checkedChildren="showSearch"
            checked={showSearch}
            onChange={this.triggerShowSearch}
            style={{ marginTop: 10, marginBottom: 5, size: 20 }}
          />
        </Modal>
      </div>
    );
  }
}

