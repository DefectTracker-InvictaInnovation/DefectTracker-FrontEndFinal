import React, { Component } from 'react';
import { Row } from 'antd';
import { Chart } from 'primereact/chart';

const CompanyProductivityMeter = () => {

    // data for line bar
    let lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: '#9CCC65',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    return(
       // {/* progress lines starts here */}
        <Row>

        <div
            style={{
                padding: 24,
                borderRadius: "0.2em",
                background: '#fff',
                minHeight: '250px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
            }}>

            <h1>Productivity Meter</h1>
            <Chart type="bar" data={lineChartData} />


        </div>
    </Row>
    // {/* progress lines ends here */}
    );


}



export default CompanyProductivityMeter;