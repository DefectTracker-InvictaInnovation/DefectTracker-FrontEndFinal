import React from 'react'
import { PageHeader, Row } from 'antd';
import { Chart } from 'primereact/chart';

const DeveloperMultiAxisDataSevAndPrioChart = () => {
    //data for radar chart
    const multiAxisData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Severity',
            fill: false,
            backgroundColor: '#42A5F5',
            borderColor: '#42A5F5',
            yAxisID: 'y-axis-1',
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            label: 'Priority',
            fill: false,
            backgroundColor: '#66BB6A',
            borderColor: '#66BB6A',
            yAxisID: 'y-axis-2',
            data: [28, 48, 40, 19, 45, 52, 90]
        }]
    };

    //options for the multi axis chart
    const multiAxisOptions = {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        scales: {
            yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
            }, {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    drawOnChartArea: false
                }
            }]
        }
    }


    //html part of radar chart
    return (
        <div>
            <PageHeader title="Severity & Priority" style={{ marginRight: '0px' }} />
            <div style={{ padding: 24, background: '#fff', minHeight: 360, marginRight: '00px' }}>
                <div className="content-section implementation">
                    <Chart type="line" data={multiAxisData} options={multiAxisOptions} />
                </div>
            </div>
        </div>
    );

}

export default DeveloperMultiAxisDataSevAndPrioChart;