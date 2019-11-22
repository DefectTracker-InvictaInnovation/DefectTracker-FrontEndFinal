import React, { Component } from 'react';
import { Row } from 'antd';
import { Chart } from 'primereact/chart';


const DefectPriorityAndSeverityChart = () => {

    // data for line chart
    const lineChartData = {
        labels: ['First Release', '2nd Release', '3rd Release', '4th Release'],
        datasets: [
            {
                label: 'Severity',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: '#e41749',
                borderColor: '#e41749'
            },
            {
                label: 'Priority',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: '#004d61',
                borderColor: '#004d61'
            }
        ]
    };

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
                <div>
                    <div className="content-section introduction">
                        <div className="feature-intro">
                            <h1>LineChart</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima doloribus aut eius atque ne</p>
                        </div>
                    </div>

                    <div className="content-section implementation">
                        <h3>Basic</h3>
                        <Chart type="line" data={lineChartData} />
                    </div>
                </div>
            </div>
        </Row>
    );

}

export default DefectPriorityAndSeverityChart;

