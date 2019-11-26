import { Transfer, Button, Modal, Table, Select, TreeSelect } from 'antd';
import React from 'react';
import difference from 'lodash/difference';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from './../../constants/index'


const { TreeNode } = TreeSelect;
const { Option, OptGroup } = Select;
const d = [];
const z = [];


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
export default class AllocateMember extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
    modal3Visible: false,
    visible: false,
    role: [],
    project: [],
    roleAllcation: [],
    value: '',
    value1: '',
    value2: '',
    value3: '',
    module: [],
    submodule: [],
    projectroleId: '',
    moduleId: '',
    subModuleList: []

  };

  componentDidMount() {
    this.fetchRoleallocation();
    this.fetchProjects();
    // this.fetchModules();
    // this.fetchfindallmain();
    this.fetchSubModules();
  }

  fetchRoleallocation() {
    var _this = this;
    axios.get(API_BASE_URL + '/getAllRole', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response.data);
        let role = response.data
        _this.setState({ role: role });
        console.log(_this.state.roleAllcation);
        const list = []

        console.log("Get Project Allocation" + role)
        response.data.map((post, index) => {
          list.push({
            key: index,
            employeeid: post.employeeid,
            name: post.name,
            firstname: post.firstname,
            roleName: post.roleName,
            projectId: post.projectId

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
          employeeid: post.employeeid,
          name: post.name,
          firstname: post.firstname,
          roleName: post.roleName,


        });

        console.log(list1)
        _this.setState({
          list1: list1
        })
      }
    });
    this.fetchModules(value);

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


  fetchSubModules() {
    var _this = this;
    axios.get(API_BASE_URL + '/GetAllsubmodule', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(function (response) {
        // handle success
        console.log(response.data);
        _this.setState({ submodule: response.data });
        console.log(_this.state.submodule);

      });
  }

  saveModule(targetKeys) {
    console.log(targetKeys[0]);
    console.log(this.state.role)

    this.state.role.map((post, index) => {
      console.log(post.key)

      for (var i = 0; i < 11; i++) {
        if (targetKeys[i] == index) {
          console.log(post.projectroleId)
          let data1 = {
            projectroleId: post.projectroleId,
            subModuleId: this.state.value3
          }

          console.log(data1)
          d.push(post.projectroleId);
          this.state = {
            data1: data1
          }
        }
      }
    })

  }
  fetchModules(projectid) {
    var _this = this;
    axios.get(API_BASE_URL + '/GetAllmodule/' + projectid, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
      .then(response => {
        // handle success
        console.log(response.data);
        _this.setState({ module: response.data });
        console.log(_this.state.module);

        let opt = response.data.map((post, index) => {

          return <TreeNode value={post.moduleName} title={post.moduleName} key={index}>
            {post.subModule.map((x, k) => {
              return <TreeNode value={x.subModuleName} title={x.subModuleName} key={index.key}>
              </TreeNode>
            })}

          </TreeNode>
        }

        )
        _this.setState({ opt });
      }
      );
  }

  onChange1 = (nextTargetKeys, value) => {
    this.setState({ targetKeys: nextTargetKeys });
    console.log(value);
    console.log(nextTargetKeys);
    z.push(nextTargetKeys)
    this.setState({
      value
    });
  };
  onChange = (nextTargetKeys, value) => {
    this.setState({ targetKeys: nextTargetKeys });
    console.log(value);
    console.log(nextTargetKeys);

    this.setState({
      value
    });
  };

  onChangeSubModule = (value) => {
    this.setState({
      value3: value
    })
    console.log(`selected ${value}`);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);

    const mod = {
      projectRoleAllocation: {
        projectroleId: d[0]
      },
      module: {
        moduleId: "M001"
      },

      subModuleList: z.pop()
    }

    axios.post(API_BASE_URL + "/savemoduleallocation", mod, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
    console.log(mod)

    this.setState({
      visible: false,
    });
  };

  setModal3Visible(modal3Visible) {
    console.log(this.state.data1);
    let data3 = JSON.stringify(this.state.data1);
    console.log(data3)
    axios.post(API_BASE_URL + "/savemoduleallocation", this.state.data1, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
    this.setState({ modal3Visible });
  }


  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };



  //   fetchfindallmain() {
  //     var _this = this;
  //     axios.get(API_BASE_URL+'/FindallMain',{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
  //       .then(function (response) {
  //         console.log(response.data)

  //         let par = response.data.map((post, index) => {
  //           console.log(response.data[index].subModule)
  //           return (<TreeNode value={post.moduleName} title={post.moduleName} key={index}>
  //             {response.data[index].subModule.map((data, key) => {
  //               return <TreeNode value={data.subModuleName} title={data.subModuleName} key={key} />
  //             })
  //             })}

  // </TreeNode>)

  //         }
  //         )
  //         _this.setState({ par })

  //       })
  //   }




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
        title: "Role",
        dataIndex: "roleName",
        key: "roleName",
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
        title: "Role",
        dataIndex: "roleName",
        key: "roleName",
      }
    ];


    return (
      <div>
        <Button type="primary" onClick={() => this.setModal3Visible(true)}>
          Module Allocation
        </Button>

        <Modal
          title="Module Allocation"
          width="80%"
          style={{
            top: 20
          }}
          visible={this.state.modal3Visible}
          onOk={this.handleOk}
          onCancel={() => this.setModal3Visible(false)}>
          <Select
            showSearch
            style={{ width: 200, marignBottom: '20px' }}
            placeholder="Select a Project"
            optionFilterProp="children"
            onChange={this.handleChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <OptGroup label="Projects">
              {this.state.project.map((item, index) => {
                return <Option key={index} value={item.projectId}> {item.projectName}</Option>
              })}
            </OptGroup>

          </Select>
          &nbsp;&nbsp;
          <TreeSelect
            showSearch
            style={{ width: '20%' }}
            // value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={this.onChange1}
          >
            {this.state.opt}
          </TreeSelect>
          {/* <Select
            showSearch
            style={{ width: 200, marignBottom: '20px' }}
            placeholder="Select a SubModule"
            optionFilterProp="children"
            onChange={this.onChangeSubModule}
            // onFocus={onFocus}
            // onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <OptGroup label="Sub Module">
              {this.state.submodule.map((item, index) => {
                return <Option key={index} value={item.subModuleId}> {item.subModuleName}</Option>
              })}
            </OptGroup>

          </Select> */}

          <br /><br />

          <TableTransfer
            dataSource={this.state.list1}
            targetKeys={this.state.targetKeys}
            showSearch={true}
            onChange={this.onChange}
            filterOption={(inputValue, item) =>
              item.employeeid.indexOf(inputValue) !== -1 ||
              item.name.indexOf(inputValue) !== -1 ||
              item.firstname.indexOf(inputValue) !== -1 ||
              item.roleName.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
            selectedKeys={this.saveModule(targetKeys)}
          />
        </Modal>
      </div>
    );
  }
}