import {
    Modal,
    Button,
    TreeSelect,
    Select,
    Row,
    Col,
    PageHeader,
    Table,
    Progress,
    Statistic,
    Transfer,
    Pagination,
    Tag,
    Icon
} from 'antd';
import React from 'react';
import App from './AllocateMember';
import DeAllocateMember from './DeAllocateMember';
import axios from 'axios';
import difference from 'lodash/difference';
import { API_BASE_URL, ACCESS_TOKEN } from './../../constants/index'
import AllocateMember from './AllocateMember';

/**Role Allocation**/
const resourceAllcation = [];
const originTargetKeys = resourceAllcation.filter(item => +item.key % 3 > 1).map(item => item.key);
//const { Option, OptGroup } = Select;
const TreeNode = TreeSelect.TreeNode;
const { Option, OptGroup } = Select;
//const { SubMenu  } = Menu;

const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 10 + 1000 * 50; // Moment is also OK
const deadline1 = Date.now() + 1000 * 60 * 60 * 24 * 20 + 1000 * 30;
const deadline2 = Date.now() + 1000 * 60 * 60 * 24 * 35 + 1000 * 10;
const deadline3 = Date.now() + 1000 * 60 * 60 * 24 * 50 + 1000 * 60;
const deadline4 = Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 25;

const dataSource = [
    {
        key: '1',
        project: 'Defect System',
        se: 28,
        ase: 70,
        td: 3,
        qatd: 3,
        sqa: 14,
        aqa: 2
    }, {
        key: '2',
        project: 'Leave Management System',
        se: 18,
        ase: 50,
        td: 3,
        qatd: 5,
        sqa: 12,
        aqa: 5
    }, {
        key: '2',
        project: 'HRM System',
        se: 25,
        ase: 60,
        td: 3,
        qatd: 6,
        sqa: 10,
        aqa: 3
    }, {
        key: '2',
        project: 'School Management System',
        se: 20,
        ase: 40,
        td: 2,
        qatd: 2,
        sqa: 5,
        aqa: 2
    }
];

const columns = [
    {
        title: 'Project',
        dataIndex: 'project',
        key: 'project'
    }, {
        title: 'Software Engineer',
        dataIndex: 'se',
        key: 'se'
    }, {
        title: 'Associate Software Engineer',
        dataIndex: 'ase',
        key: 'ase'
    }, {
        title: 'Tech Lead',
        dataIndex: 'td',
        key: 'td'
    }, {
        title: 'QA Tech Lead',
        dataIndex: 'qatd',
        key: 'qatd'
    }, {
        title: 'Senior QA',
        dataIndex: 'sqa',
        key: 'sqa'
    }, {
        title: 'Associate QA',
        dataIndex: 'aqa',
        key: 'aqa'
    }
];

function onChange(value) {
    console.log(`selected ${value}`);
}

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

export default class ProjectManageAllocation extends React.Component {

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
        role: [],
        value1: ''

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
        axios.get(API_BASE_URL + '/getseandqaOnly', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
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
        axios.get(API_BASE_URL + '/GetAllproject', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(function (response) {
                // handle success
                console.log(response.data);
                _this.setState({ project: response.data });
                console.log(_this.state.project);

            });
    }

    fetchRole() {
        var _this = this;
        axios.get(API_BASE_URL + '/getAllRoleInfo', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
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

    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    setModal3Visible(modal3Visible) {
        this.setState({ modal3Visible });
    }

    render() {
        const { targetKeys } = this.state;
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
                title: "Designation",
                dataIndex: "designationname",
                key: "designationname",
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
                title: "Designation",
                dataIndex: "designationname",
                key: "designationname",
            }
        ];
        const _this = this;
        return (
            <React.Fragment>
                <Row>
                    <Col span={24}>

                        <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 360,
                                marginRight: '0px'
                            }}>
                            <Col span={0}></Col>

                            <Col span={3}>

                                <div>

                                    <Button type="primary" onClick={() => this.setModal1Visible(true)}>
                                        Role Allocation
                                    </Button>

                                    <Modal
                                        title="Project Allocation"
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
                                            style={{ width: 200, marignBottom: '20px' }}
                                            placeholder="Select a Role"
                                            optionFilterProp="children"
                                            onChange={this.onChangeRole}
                                            onSearch={onSearch}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            <OptGroup label="Roles">

                                                {this.state.role}
                                            </OptGroup>

                                        </Select>
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
                            <Col span={3}>

                                <div>

                                    <Button
                                        style={{
                                            backgroundColor: '#ff3f34',
                                            color: '#fff'
                                        }}
                                        onClick={() => this.setModal2Visible(true)}>
                                        Deallocation
                                    </Button>

                                    <Modal
                                        title="Project Deallocation"
                                        width="60%"
                                        style={{
                                            top: 20
                                        }}
                                        visible={this.state.modal2Visible}
                                        onOk={() => this.setModal2Visible(false)}
                                        onCancel={() => this.setModal2Visible(false)}>

                                        <DeAllocateMember/>
                                    </Modal>
                                </div>
                            </Col>

                            <Col span={3}>
                                <div>
                                   <AllocateMember/>
                                </div>
                            </Col>

                            <br />
                            <br />
                            <Table dataSource={dataSource} columns={columns} />

                        </div>
                    </Col>

                    <Col span={12}>
                        <br />
                        <PageHeader
                            title="Project Performance"
                            style={{
                                marginRight: '20px'
                            }} />
                        <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 300,
                                marginRight: '20px'
                            }}>
                            <div>
                                <h3
                                    style={{
                                        marginTop: 9
                                    }}>Library System</h3><Progress percent={100} />
                                <h3
                                    style={{
                                        marginTop: 9
                                    }}>Defect System</h3><Progress percent={70} />
                                <h3
                                    style={{
                                        marginTop: 9
                                    }}>HRM System</h3><Progress percent={30} />
                                <h3
                                    style={{
                                        marginTop: 9
                                    }}>Leave Management System</h3><Progress percent={30} />
                                <h3
                                    style={{
                                        marginTop: 9
                                    }}>School Management System</h3><Progress percent={50} />

                            </div>

                        </div>
                    </Col>

                    <Col span={12}>
                        <br />
                        <PageHeader title="Project Remaining  Time" />
                        <div
                            style={{
                                padding: 30,
                                background: '#fff',
                                minHeight: 307
                            }}>
                            <Row gutter={16}>
                                <Col
                                    span={12}
                                    style={{
                                        marginTop: 15
                                    }}>
                                    <Countdown title="Library System" value={deadline4} format="D - H:m:s" />
                                </Col>
                                <Col
                                    span={12}
                                    style={{
                                        marginTop: 15
                                    }}>
                                    <Countdown title="Defect System" value={deadline} format="D - H:m:s" />
                                </Col>
                                <Col
                                    span={12}
                                    style={{
                                        marginTop: 15
                                    }}>
                                    <Countdown title="HRM System" value={deadline1} format="D - H:m:s" />
                                </Col>
                                <Col
                                    span={12}
                                    style={{
                                        marginTop: 15
                                    }}>
                                    <Countdown
                                        title="Leave Management System"
                                        value={deadline2}
                                        format="D - H:m:s" />
                                </Col>
                                <Col
                                    span={24}
                                    style={{
                                        marginTop: 15
                                    }}>
                                    <Countdown
                                        title="School Management System"
                                        value={deadline3}
                                        format="D - H:m:s" />
                                </Col>

                                <Col
                                    span={16}
                                    style={{
                                        marginTop: 15
                                    }}></Col>
                                <Col
                                    span={8}
                                    style={{
                                        marginTop: 15
                                    }}>
                                    <Pagination defaultCurrent={1} total={10} />
                                </Col>

                            </Row>,

                        </div>
                    </Col>
                </Row>
                <br />

            </React.Fragment>
        );
    }

}
