import React from 'react';
import { PageHeader, Row, Col } from 'antd';
import { Chart } from 'primereact/chart';

const DeveloperLineChart = () => {

    //line chart data
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            type: 'bar',
            label: 'Total Defect',
            backgroundColor: '#4CAF50',
            data: [
                40,
                55,
                60,
                85,
                100
            ],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Closed Defect',
            backgroundColor: '#FFC107',
            data: [
                9,
                14,
                21,
                29,
                40
            ]
        }]
    };

    //options
    const options = {
        responsive: true,
        title: {
            display: true,
            text: ' '
        },
        tooltips: {
            mode: 'index',
            intersect: true
        }
    };

    //html part of line chart
    return (
        <div>
            <br />
            <PageHeader title="Total Defect & Closed Defect" style={{ marginRight: '20px' }} />
            <div style={{ padding: 24, background: '#fff', minHeight: 250, marginRight: '20px' }}>

                <Row >
                    <Col span={24}>

                        <div style={{ padding: 24, background: '#fff', minHeight: 50 }} >



                            <div className="content-section implementation">

                                <Chart type="bar" data={lineData} options={options} />

                            </div>



                        </div>


                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DeveloperLineChart;