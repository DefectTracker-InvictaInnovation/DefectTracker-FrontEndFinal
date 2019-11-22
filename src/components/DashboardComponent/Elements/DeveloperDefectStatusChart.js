import React, { Component } from 'react';
import { Col } from 'antd';
import { Chart } from 'primereact/chart';

const DeveloperDefectStatusChart = () => {

    //date for status chart
    let data = {
        labels: ['New', 'Open', 'Reject', 'Closed'],
        datasets: [
            {
                data: [55, 5, 10, 30],
                backgroundColor: [
                    "#FF6384",
                    "#4CAF50",
                    "#FFCE56",
                    "#36A2EB"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#4CAF50",
                    "#FFCE56",
                    "#36A2EB"
                ]
            }]
    };

    //html part of the chart
    return (
        <Col span={24}>

            <div style={{ padding: 24, background: '#fff', minHeight: 50 }} >
                <div className="content-section introduction">

                </div>
                <div className="content-section implementation">
                    <br />
                    <Chart type="pie" data={data} />
                </div>
            </div>


        </Col>
    );

}



export default DeveloperDefectStatusChart;