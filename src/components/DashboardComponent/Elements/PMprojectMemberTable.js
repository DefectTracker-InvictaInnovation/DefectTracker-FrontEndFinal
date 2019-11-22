import React, { Component } from 'react'
import { Table, Button, Icon } from 'antd';



class PMprojectMemberTable extends Component {

    //state declaration
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };


    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    setIdSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'id',
            },
        });
    };

    render() {

        //data for table
        let tableData = [
            {
                id: '1',
                key: '1',
                name: 'Task Management System',
                member: 'Thuva, Kishanth, Romi',
            },
            {
                id: '2',
                key: '2',
                name: 'Hospital Management System',
                member: 'thuva, kishanth, romi',
            },
            {
                id: '3',
                key: '3',
                name: 'School Management System',
                member: 'Thuva',
            },

            {
                id: '4',
                key: '4',
                name: 'Defect Tracker',
                member: 'Thuviyan, Pratheepan, Romi',


            },
        ];


        // For Table functions
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
                sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            },
            {
                title: 'Project Name',
                dataIndex: 'name',
                key: 'name',
                filters: [{ text: 'Task', value: 'Task' }, { text: 'Management', value: 'Management' }],
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: 'Member',
                dataIndex: 'member',
                key: 'member',
                filters: [{ text: 'Thuva', value: 'Thuva' }, { text: 'Kishanth', value: 'Kishanth' }],
                filteredValue: filteredInfo.member || null,
                onFilter: (value, record) => record.member.includes(value),
                sorter: (a, b) => a.member.length - b.member.length,
                sortOrder: sortedInfo.columnKey === 'member' && sortedInfo.order,
            },

            {
                title: 'View Member',
                dataIndex: 'viewmember',
                key: 'viewmember',
                render: () => <Button style={{ marginLeft: '1rem' }}><Icon type="security-scan" /></Button>
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                key: 'edit',
                render: () => <Button type="primary">Edit</Button>
            },


        ];
        // Table functions End



        //html part of radar chart
        return (
            <div>
                <div className="table-operations" >

                    <Button onClick={this.clearFilters} type="primary">Clear filters</Button>

                </div>
                <div>
                    <br />
                </div>
                <Table columns={columns} dataSource={tableData} onChange={this.handleChange} style={{ textAlign: "center", alignContent: "center", alignItems: "center" }} />

            </div>
        );

    }


}

export default PMprojectMemberTable;