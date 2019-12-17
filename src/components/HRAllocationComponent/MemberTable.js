import React, { Component } from 'react';
import { Table, Tag, Row, Col, Progress, Select } from 'antd';
import Allocation from './Allocation';
import axios from "axios";
import { API_BASE_URL,ACCESS_TOKEN } from '../../constants';

const { Option, OptGroup } = Select;

export class Allocate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            Allocation: [],
            project: [],
            employee: [],
            Allresource:'',

        };
        this.fetchProjects = this.fetchProjects.bind(this);
        this.onChangeProjects = this.onChangeProjects.bind(this);
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    componentDidMount() {
        this.fetchProjects();
        this.fetchEmployee();
    }

    fetchProjects() {
        var _this = this;
        axios.get(API_BASE_URL+'/GetAllproject',{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
            .then(function (response) {
                console.log(response.data);
                _this.setState({ project: response.data });
                console.log(_this.state.project);

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
            this.fetchEmployee()
        } else {
            axios
                .get(API_BASE_URL+"/getprojectbyresource/" + value,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
                .then(function (response) {
                    console.log(response.data)
                    _this.setState({
                        employee: response.data,

                    })
                });
        }
    }


    fetchEmployee() {
        axios
        .get(API_BASE_URL+"/getallresource",{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
        .then(response => {
          console.warn("Refresh Service is working");
          this.setState({ employee: response.data ,
          Allresource:response.data});
        });
    }



    render() {
        const columns = [

            {
                title: 'EmpID',
                dataIndex: 'employeeid',
                key: 'employeeid',
            },
            {
                title: 'Employee Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Designation',
                key: 'designationname',
                dataIndex: 'designationname',
            },

            {
                title: 'Employee Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Availability',
                dataIndex: 'availability',
                key: 'availability',
                render: () => (<Progress type="circle" percent={0} width={40} />)
            }
        ];
        return (

            <div className="gutter-example">
                
                <Row gutter={16}>
                <Col span={24}>
                <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                minHeight: 360,
                                marginRight: '0px'
                            }}>
                <Col span={3}>
                
                    
                    <div > <Allocation /></div> </Col>
                    <div style={{ float: "right" }}>
                        <Select
                            placeholder="Select the Project"
                            style={{ width: 220 }}
                            defaultValue="All"
                            onChange={this.onChangeProjects}

                        >
                            <Option value="All">All</Option>

                            {this.state.project.map(function (item, index) {
                                return (
                                    <Option key={index} defaultValue="All" value={item.projectId}>
                                        {item.projectName}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <br />
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Table columns={columns} dataSource={this.state.employee} />
                        </div>
                    </Col>
                    </div>
                    </Col>
                </Row>
            </div >

        )
    }
}

export default Allocate
