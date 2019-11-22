import React from 'react';
import { Tag, Table, Row, Icon, tag } from 'antd';
import { Chart } from 'primereact/chart';

const CompanyClientTable = () => {


    //table data column setting
    let columns = [
        {
            title: 'Company Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: 'Project Title',
            dataIndex: 'projecttitle',
            key: 'Project Title',
        },
        {
            title: 'Project Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Deadline',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color;
                        if (tag === '10 Days' || tag === '20 Days' || tag === '30 Days') {
                            color = 'volcano';
                        }
                        else if (tag === '40 Days' || tag === '50 Days' || tag === '60 Days' || tag === '1 month') {
                            color = 'blue';
                        }
                        else if (tag === '70 Days' || tag === '80 Days') {
                            color = "green"
                        }

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        }
    ];

    //data for the table
    const tabledata = [
        {
            key: '1',
            name: 'British Telecom',
            projecttitle: 'Project 1',
            duration: '6 months',
            tags: ['20 Days']
        },
        {
            key: '2',
            name: 'ThomasCook Money',
            projecttitle: 'Project 2',
            duration: '4 months',
            tags: ['50 Days']
        },
        {
            key: '3',
            name: 'Manhattan Navigators',
            projecttitle: 'Project 3',
            duration: '2 months',
            tags: ['70 Days']
        },
    ];

    return (
        <Row>
            <div
                style={{
                    padding: 24,
                    background: '#fff',
                    border: "#605877",
                    zIndex: "5000",
                    borderRadius: "0.2em",
                    minHeight: '80%',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
                <h1>Our Clients</h1>
                <br></br>
                <Table columns={columns} dataSource={tabledata} />
            </div>
        </Row>
    );
}
export default CompanyClientTable;