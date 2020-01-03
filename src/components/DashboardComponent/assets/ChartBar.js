import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'antd';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../../../constants/index';

export default class ChartBar extends Component {

    constructor(props) {
        super(props)
        this.state = {

            highsev: '',
            mediumsev: '',
            lowsev: '',
            count: '',
            projectid: this.props.projectId,
        }
    };

    // onChangeRole = (value) => {

    //     this.setState({ projectid: value })

    //     this.getLow(value);
    //     this.getMedium(value);
    //     this.getHigh(value);

    //     console.log(value)

    // }
    getdefectcount() {
        axios
            .get(API_BASE_URL + '/gettoatalcount', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                console.log(res.data)
                this.setState({
                    count: res.data
                })
            })
    }
    getHigh(value) {
        axios
            .get(API_BASE_URL + '/getprioritycount/' + this.state.projectid + '&high', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                console.log("" + res.data)
                this.setState({
                    highsev: res.data
                })
            })
    }

    getMedium(value) {
        axios
            .get(API_BASE_URL + '/getprioritycount/' + this.state.projectid + '&medium', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                console.log(res.data)
                this.setState({
                    mediumsev: res.data
                })
            })
    }



    getlow(value) {
        const url = API_BASE_URL + '/getprioritycount/' + this.state.projectid + '&low';
        axios.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(response => this.setState({
                lowsev: response.data,
            }))
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getHigh()
        this.getMedium()
        this.getlow()
        this.getdefectcount()
        console.log('thuva' + this.state.projectid);
    }


    render() {
        console.log()
        const multiAxisData = {
            labels: ['High', 'Medium', 'Low '],
            datasets: [{
                label: 'Defects',
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5'
                ],
                yAxisID: 'y-axis-1',
                data: [this.state.highsev, this.state.mediumsev, this.state.lowsev]
            }]
        };

        const multiAxisOptions = {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            }
        }



        return (
            <div>
                <Card title="Priority Defect Types" style={{ borderRadius: "5px", margin: "0 0 0 5px" }}>
                    <Chart type="bar" data={multiAxisData} options={multiAxisOptions} style={{ padding: "0 0 60px 0", }} />
                </Card>
            </div>
        )
    }
}
