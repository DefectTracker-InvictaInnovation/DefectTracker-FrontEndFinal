import React from 'react'
import { PageHeader, Row } from 'antd';
import { Chart } from 'primereact/chart';

const DeveloperRadarChart = () => {
    //data for radar chart
    const radarData = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };


    //html part of radar chart
    return (
        <div>
            <br />
            <PageHeader title="RadarChart" />
            <div style={{ padding: 30, background: '#fff', minHeight: 307 }}>

                <Row>
                    <div>


                        <div className="content-section implementation">

                            <Chart type="radar" data={radarData} />
                        </div>
                    </div>

                </Row>
            </div>
        </div>
    );

}

export default DeveloperRadarChart;