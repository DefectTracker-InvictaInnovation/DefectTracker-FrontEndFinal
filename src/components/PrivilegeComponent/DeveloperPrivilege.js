import React, { Component } from 'react'
import { Table, Switch, Button, Input, PageHeader } from 'antd';
import axios from "axios";
import { ROLE_NAME, ACCESS_TOKEN, API_BASE_URL } from '../../constants/index';

const Search = Input.Search;

const idlist = [];
const list = [];

export default class DeveloperPrivilege extends Component {
    state = {
        DeveloperPrivilages: ''
    }

    onChange(record, checked) {
        console.log(record);
        console.log(`switch to ${checked}`);
        let file = {
            privilegeName: record.privilegeName,
            status: checked

        }
        list.push(file);
        idlist.push(record.id)
        this.setState({
            [`${record.privilegeName}Status`]: checked
        })


    }
    componentDidMount() {
        axios.get(API_BASE_URL + "/getAllDeveloperPrivilegeInfo", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                res.data.map((post, index) => {

                })
                this.setState({ QAPrivilages: res.data })
            })
    }

    submit = () => {

        for (var i = 0; i < list.length; i++) {

            console.log(list[i]);
            console.log(idlist[i]);
            axios
                .put(API_BASE_URL + "/updateDeveloperPrivilege/" + idlist[i], list[i], { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
                .then(res => {
                    console.log(res.data)
                })
        }
        console.log(idlist);
        console.log(idlist[0]);
        console.log(list);
    }
    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',

            },
            {
                title: 'Privilleges',
                dataIndex: 'privilegeName',
                render: text => <a href=" ">{text}</a>
            },
            {
                title: 'Developer',
                render: (e, record) => (<Switch defaultChecked={record.status} onChange={this, this.onChange.bind(this, record)} />)
            }

        ];

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
            breadcrumbName: 'Developer Privilege',
        },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Developer Privilege" breadcrumb={{ routes }} />
                <div
                    style={{
                        padding: '0 24px 24px 24px',
                        background: '#fff',
                        minHeight: '500px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                    }}>


                    <Search style={{ width: '200px', marginBottom: '10px' }} placeholder="Search" onSearch={value => console.log(value)} enterButton />

                    <Table
                        columns={columns} dataSource={this.state.QAPrivilages} pagination={{ pageSize: 30 }}

                    />
                </div>
                <Button type="primary" onClick={this.submit}>Set Privilages</Button>
            </React.Fragment>

        )
    }
}
