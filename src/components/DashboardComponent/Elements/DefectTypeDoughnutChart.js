import React, { Component } from 'react';
import { Chart } from 'primereact/chart';


const DefectTypeDoughnutChart = () => {

    // doughnut data
    let doughnutData = {
        labels: ['UI', 'Functionality', 'Performance'],
        datasets: [
            {
                data: [100, 17, 20],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };

    //html part 
    return (
        <div>
            <div className="content-section introduction">
                <div className="feature-intro">
                    <h1>DoughnutChart</h1>
                    <br></br>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo quod facere minima. Perferendis recusandae accusamus architecto enim aut. Et minima neque suscipit quaerat veritatis. Ipsa perspiciatis nisi vero quae aperiam!</p>
                </div>
            </div>
            <br /><br /><br />
            <div className="content-section implementation">
                <Chart height="220px" type="doughnut" data={doughnutData} />
            </div>

        </div>
    );

}

export default DefectTypeDoughnutChart;

