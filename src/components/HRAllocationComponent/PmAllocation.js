import { Modal, Button, Select, Transfer, Row, Table, Col, message } from 'antd';
import React from 'react';
import axios from "axios";
import difference from 'lodash/difference';
import { API_BASE_URL_EMP, API_BASE_URL, ACCESS_TOKEN } from '../../constants/index';

const { Option, OptGroup } = Select;
const employee = []
const originTargetKeys = employee.filter(item => +item.key % 5 > 1).map(item => item.key);

const success = () => {
  message.success('This is a success message');
};

function onSearch(val) {
  console.log('search:', val);
}
const leftTableColumns = [
  {
    title: "Id",
    dataIndex: "employeeid",
    key: "employeeid",
  },

  {
    title: "Firstname",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Surname",
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
    title: "Id",
    dataIndex: "employeeid",
    key: "employeeid",
  },

  {
    title: "Firstname",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Surname",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "Role",
    dataIndex: "designationname",
    key: "designationname",
  }
];


export default class PmAllocation extends React.Component {


  state = {
    modal1Visible: false,
    modal2Visible: false,
    modal3Visible: false,
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
    visible: false,
    project: [],
    value: '',
    resource: [],
    resourceAllcation: [],
    
    value1: '',
    roleId: "PM",

  };

  componentDidMount() {
    var _this = this;
    this.fetchResourceallocation();
    this.fetchProjects();
    console.log(_this.state.resource)
    this.fetchRole();
  }

  onChange = (nextTargetKeys, value) => {
    this.setState({ targetKeys: nextTargetKeys });
    console.log(value);
    this.setState({
      value
    });
  };

  onChangeRole = (value) => {
    this.setState({
        value2: value
    })
    console.log(`selected ${value}`);
}

  fetchResourceallocation() {
    var _this = this;
    axios.get(API_BASE_URL + '/getpmOnly', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        console.log(response.data);
        let resource = response.data
        _this.setState({ resource: resource });
        console.log(_this.state.resourceAllcation);
        const list = []

        console.log("Get Project Allocation" + resource)
        response.data.map((post, index) => {
          list.push({
            key: index,
            employeeid: post.employeeid,
            name: post.name,
            firstname: post.firstname,
            designationname: post.designationname,
            projectId: post.projectId

          });
          _this.setState({
            list: list
          })
        })
      });
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    // message.success("PM Allocation Successfully!!!")
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

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
          employeeid: post.employeeid,
          name: post.name,
          firstname: post.firstname,
          designationname: post.designationname,
        });

        console.log(list1)
        _this.setState({
          list1: list1
        })
      }
    });
    
  }

  fetchProjects() {
    var _this = this;
    axios.get(API_BASE_URL + '/getallresource', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({ project: response.data });
        console.log(_this.state.project);

      });
  }

  fetchRole() {
    var _this = this;
    axios.get(API_BASE_URL + '/getPmRoleInfo', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        let role = response.data.map((item, index) => {
          return <Option key={index} value={item.roleId}> {item.roleName}</Option>
        });
        console.log(response.data);
        _this.setState({ role });

      });
  }

  saveRole(targetKeys) {
    console.log(targetKeys[0]);
    console.log(this.state.resource)

    this.state.resource.map((post, index) => {
      console.log(post.key)

      for (var i = 0; i < 11; i++) {
        if (targetKeys[i] == index) {
          console.log(post.resourceId)
          let data1 = {
            resourceId: post.resourceId,
            roleId: this.state.value2
          }

          console.log(data1)

          this.state = {
            data1: data1
          }
        }
      }
    })

  }

  setModal1Visible(modal1Visible) {
    console.log(this.state.data1);
    let data3 = JSON.stringify(this.state.data1);
    console.log(data3)
    axios.post(API_BASE_URL + "/saverole", this.state.data1, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(res => {
        axios.get(API_BASE_URL + '/saveuser', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
          .then(function (response) {
          });

        console.log(res)
      })
    this.setState({ modal1Visible });
  }

  render() {
    const { targetKeys } = this.state;
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


    return (
      <React.Fragment>
        <Row>
          <Col span={24}>

            <div>

              <Button type="primary" onClick={() => this.setModal1Visible(true)}>
                PM Role Allocation
              </Button>

              <Modal
                title="PM User Creation"
                width="80%"
                visible={this.state.modal1Visible}
                onOk={() => this.setModal1Visible(false)}
                onCancel={() => this.setModal1Visible(false)}>

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
                &nbsp;&nbsp;
                <Select
                  showSearch
                  defaultValue="PM"
                  style={{ width: 200, marignBottom: '20px' }}
                  placeholder="Select a Role"
                  optionFilterProp="children"
                  onChange={this.onChangeRole}
                  onSearch={onSearch}
                  readOnly
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  <OptGroup label="Roles">

                    {this.state.role}
                  </OptGroup>
                </Select>
                {/* <Select
                  // defaultValue="PM"
                  style={{ width: 100 }}
                  onChange={this.onChangeRole}
                  placeholder="PM"
                  // readOnly
                >
                  <Option value="PM">PM</Option>
                  </Select> */}
                <br></br>
                <br></br>
                <TableTransfer
                  dataSource={this.state.list1}
                  targetKeys={this.state.targetKeys}
                  showSearch={true}
                  onChange={this.onChange}
                  filterOption={(inputValue, item) =>
                    item.employeeid.indexOf(inputValue) !== -1 ||
                    item.name.indexOf(inputValue) !== -1 ||
                    item.firstname.indexOf(inputValue) !== -1 ||
                    item.designationname.indexOf(inputValue) !== -1
                  }
                  leftColumns={leftTableColumns}
                  rightColumns={rightTableColumns}
                  selectedKeys={this.saveRole(targetKeys)}
                />
              </Modal>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

