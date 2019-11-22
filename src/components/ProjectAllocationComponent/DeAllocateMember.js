import { Transfer, Select, Table, } from 'antd';
import React from 'react';
import difference from 'lodash/difference';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from './../../constants/index'

const { Option, OptGroup } = Select;

function onSearch(val) {
  console.log('search:', val);
}
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false} >
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

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
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockData = [];

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
export default class DeAllocateMember extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
    visible: false,
    role: [],
    roleAllcation: [],
    project: [],
  };

  componentDidMount() {
    this.fetchRoleallocation();
    this.fetchProjects();
  }

  fetchProjects() {
    var _this = this;
    axios.get(API_BASE_URL + '/GetAllproject', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({ project: response.data });
        console.log(_this.state.project);

      });
  }

  onChange = (nextTargetKeys, value) => {
    this.setState({ targetKeys: nextTargetKeys });
    console.log(value);
    this.setState({
      value
    });
  };

  fetchRoleallocation() {
    var _this = this;
    axios.get(API_BASE_URL + '/getallresource', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response.data);
        let role = response.data
        _this.setState({ role: role });
        console.log(_this.state.roleAllcation);
        const list = []

        console.log("Get Role Allocation" + role)
        response.data.map((post, index) => {
          list.push({
            key: index,
            resourceId: post.resourceId,
            employeeid: post.employeeid,
            name: post.name,
            firstname: post.firstname,
            email: post.email,
            designationname: post.designationname,
            projectId: post.projectId,

          });
          _this.setState({
            list: list
          })
        })
      });
  }

  handleChange = (value) => {
    this.setState({
      value1: value
    })
    var _this = this;
    console.log(value);
    console.log(this.state.list);

    const list1 = []
    this.state.list.map((post, index) => {

      if (post.projectId == value) {
        list1.push({
          key: index,
          resourceId: post.resourceId,
          employeeid: post.employeeid,
          name: post.name,
          firstname: post.firstname,
          email: post.email,
          designationname: post.designationname,
          projectId: post.projectId,
        });

        console.log(list1)
        _this.setState({
          list1: list1
        })
      }
    });

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  deallocation = (targetKeys, resourceId) => {
    var _this = this;
    console.log(targetKeys)
    console.log(_this.state.list1);
    _this.state.role.map((post, index) => {
      console.log(post.key)
      for (var i = 0; i < 11; i++) {
        if (targetKeys[i] == index) {
          let data1 = {
            resourceId: post.resourceId,
            employeeid: post.employeeid,
            name: post.name,
            firstname: post.firstname,
            email: post.email,
            designationname: post.designationname,
            projectId: post.projectId,
          }
          this.setState = {
            data1
          }
          console.log(data1)
          fetch(API_BASE_URL + "/resource/" + resourceId, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } }, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
          });
        }
      }
    });
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render() {
    const { targetKeys } = this.state;
    const leftTableColumns = [
      {
        title: "EmpyoleeId",
        dataIndex: "employeeid",
        key: "employeeid",
      },

      {
        title: "FirstName",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "LastName",
        dataIndex: "firstname",
        key: "firstname",
      },
      {
        title: "Designation",
        dataIndex: "designationname",
        key: "designationname",
      },
    ];
    const rightTableColumns = [
      {
        title: "EmployeeId",
        dataIndex: "employeeid",
        key: "employeeid",
      },

      {
        title: "FirstName",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "LastName",
        dataIndex: "firstname",
        key: "firstname",
      },
      {
        title: "Designation",
        dataIndex: "designationname",
        key: "designationname",
      }
    ];
    return (
      <div>
        <Select
          showSearch
          style={{ width: 200, marignBottom: '20px' }}
          placeholder="Select a Project"
          optionFilterProp="children"
          onChange={this.handleChange}
          onSearch={onSearch}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          <OptGroup label="Projects">
            {this.state.project.map((item, index) => {
              return <Option key={index} value={item.projectId}> {item.projectName}</Option>
            })}
          </OptGroup>

        </Select>
        <br></br>
        <br></br>
        <TableTransfer
          dataSource={this.state.list1}
          targetKeys={targetKeys}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
          selectedKeys={this.deallocation(targetKeys)}
        />
      </div>
    );
  }
}