import React, { Component } from 'react'
import { Table, Switch, Button, PageHeader } from 'antd';
import { ROLE_NAME, ACCESS_TOKEN, API_BASE_URL } from '../../constants/index';
import "./index.css";
import axios from "axios";
import { getDeveloper } from '../../services/PrivilegeConfig';


const data = []
const iddata = []
const pmdata = [];
const qadata = [];
const devdata = [];
const qatechlead = [];
const techlead = []
const idpmdata = [];
const idqadata = [];
const iddevdata = [];
const idqatechlead = [];
const idtechlead = [];
let devlop = []

export default class CompanyPrivilege extends Component {

    state = {
        projectPrivileges: [],
        developerPrivileges: '',
        developerstatus: ''
    }



    getproject() {
        axios.get(API_BASE_URL + "/getAllProjectPrivilegeInfo", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                console.log(res.data)
                this.setState({ projectPrivileges: res.data })
            })
    }

    componentDidMount() {
        this.getproject();
        this.getDeveloper()
    }

    getDeveloper() {

        axios.get(API_BASE_URL + "/getAllDeveloperPrivilegeInfo", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                devlop = res.data;
            })
    }
    onChangePm(record, msg, checked) {
        console.log(record);
        console.log(checked);
        console.log(msg);

        let file = {
            privilegeName: record.privilegeName,
            status: checked
        }
        if(checked){
        data.push(file);
        iddata.push(record.id);
        pmdata.push(file);
        idpmdata.push(record.id);
        }
    }

    onChangeDev(record, msg, checked) {
        console.log(record);
        console.log(checked);
        console.log(msg);
        let file = {
            privilegeName: record.privilegeName,
            status: checked
        }
        data.push(file);
        iddata.push(record.id);
        devdata.push(file);
        iddevdata.push(record.id)
    }

    onChangeQa(record, msg, checked) {
        console.log(record);
        console.log(checked);
        console.log(msg);
        let file = {
            privilegeName: record.privilegeName,
            status: checked
        }
        data.push(file);
        iddata.push(record.id);
        qadata.push(file);
        idqadata.push(record.id)
    }

    onChangeQaTechLead(record, msg, checked) {
        console.log(record);
        console.log(checked);
        console.log(msg);
        let file = {
            privilegeName: record.privilegeName,
            status: checked
        }

        data.push(file);
        iddata.push(record.id);
        qatechlead.push(file);
        idqatechlead.push(record.id)

    }

    onChangeTechLead(record, msg, checked) {
        console.log(record);
        console.log(checked);
        console.log(msg);
        let file = {
            privilegeName: record.privilegeName,
            status: checked
        }
        data.push(file);
        iddata.push(record.id);
        techlead.push(file);
        idtechlead.push(record.id);

    }

    submit = () => {
        console.log(data);
        console.log(iddata);

        for (var i = 0; i < qatechlead.length; i++) {
            axios
                .post(API_BASE_URL + "/saveQAPrivilege", qatechlead[i], { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
                .then(res => {
                    console.log(res.data)
                })
        }

        for (var i = 0; i < pmdata.length; i++) {
            axios
                .post(API_BASE_URL + "/savePMPrivilege", pmdata[i], { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
                .then(res => {
                    console.log(res.data)
                })
        }
        for (var i = 0; i < devdata.length; i++) {
            axios
                .post(API_BASE_URL + "/saveDeveloperPrivilege", devdata[i], { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
                .then(res => {
                    console.log(res.data)
                })
        }

        for (var i = 0; i < data.length; i++) {
            axios
                .put(API_BASE_URL + "/updateprojectprivilege/" + iddata[i], data[i], { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
                .then(res => {
                    console.log(res.data)
                })
        }
        for (var i = 0; i < techlead.length; i++) {
            axios
                .post(API_BASE_URL + "/saveHRPrivilege", techlead[i], { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
                .then(res => {
                    console.log(res.data)
                })
        }


    }

    getstatus() {
        console.log(this.state.developerPrivileges)
        devlop.map(post => {
            if ("ManageCompany" == post.privilegeName) {
                console.log(post.status)
            }
        })

    }
    render() {
        const { handleSwitchChange } = this.props;
        const routes = [{
            path: 'index',
            breadcrumbName: 'Settings',
        },
        {
            path: 'first',
            breadcrumbName: 'Privilege',
        },
        {
            path: 'second',
            breadcrumbName: 'Company Privilege',
        },
        ];

        const columns = [
            {
                title: 'Company Admin Privillages',
                dataIndex: 'privilegeName',
                render: text => <a href=" ">{text}</a>
            },
            {
                title: 'Project Manager',
                width: '15%',
                render: (e, record) => (< Switch defaultChecked={record.status} onChange={this, this.onChangePm.bind(this, record, "PM")} />)
            },
            {
                title: 'Developer',
                width: '15%',
                render: (e, record) => (< Switch defaultChecked={record.status} onChange={this, this.onChangeDev.bind(this, record, "Dev")} />)
            },
            {
                title: 'QA',
                width: '15%',
                render: (e, record) => (< Switch defaultChecked={record.status} onChange={this, this.onChangeQa.bind(this, record, "QA")} />)
            },
            {
                title: 'HR',
                width: '15%',
                render: (e, record) => (< Switch defaultChecked={record.status} onChange={this, this.onChangeTechLead.bind(this, record, "TechLead")} />)
            },
            {
                title: 'QA Lead',
                width: '15%',
                render: (e, record) => (< Switch defaultChecked={record.status} onChange={this, this.onChangeQaTechLead.bind(this, record, "QaTechLead")} />)
            }
        ];
        return (
            <React.Fragment>
                <PageHeader title="Company Privilege" breadcrumb={{ routes }} />
                <div
                    style={{
                        padding: '0 24px 24px 24px',
                        background: '#fff',
                        minHeight: '500px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                    }}>
                    <Table columns={columns} dataSource={this.state.projectPrivileges} onChange={handleSwitchChange} pagination={{ pageSize: 50 }} />
                    <p align="right"><Button type="primary" onClick={this.submit}>Set Privilages</Button></p>
                </div>
            </React.Fragment>
        )
    }
}
