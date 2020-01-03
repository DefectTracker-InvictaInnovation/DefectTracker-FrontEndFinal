import React from 'react';
import { Breadcrumb, Statistic, Card, Row, Col, Icon, Timeline, Select, Progress, Table, Button } from 'antd';
import ChartBar from './assets/ChartBar';
import ChartPolar from './assets/ChartPolar';
import { Chart } from 'primereact/chart';
import { API_BASE_URL, CURRENT_USER, API_BASE_URL_PRODUCT, ACCESS_TOKEN, LOGIN_API_BASE_URL, EXISTING_EMAIL } from '../../../src/constants/index';
import DeveloperDefectDetail from './Elements/DeveloperDefectDetail';
import DeveloperDefectPercentage from './Elements/DeveloperDefectPercentage';
import DeveloperDefectStatusChart from './Elements/DeveloperDefectStatusChart';
import DeveloperRadarChart from './Elements/DeveloperRadarChart';
import DefectTypeDoughnutChart from './Elements/DefectTypeDoughnutChart';
import DeveloperLineChart from './Elements/DeveloperLineChart';
import DashboardConfig from './DashboardConfig';
import axios from 'axios';


const Option = Select.Option;
const currentuser = localStorage.getItem(CURRENT_USER);
class ProjectManagerDashboard extends React.Component {


    state = {
        filteredInfo: null,
        sortedInfo: null,
        color: '',
        highsev: '',
        mediumsev: '',
        lowsev: '',
        DefectCount: [],
        value: '',
        density: '',
        StatusNew: '',
        StatusOpen: '',
        StatusClose: '',
        StatusRejected: '',
        StatusReOpen: '',
        StatusFixed: '',
        StatusDefered: '',
        ratio: '',
        selectedlist: '',
        name: '',
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        role: '',

        getall: '',
        email: '',
        high: '',
        openhighsev: ''

    };
    // Hello Hari
    getHigh(value) {

        axios
            .get(API_BASE_URL + '/getseveritycount/' + value + '&high', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                console.log("thuva" + res.data)
                this.setState({
                    highsev: res.data,
                })
            }) //.catch(function (error) {
        //     console.log("testing" + error);
        // });
    }

    getMedium(value) {
        axios
            .get(API_BASE_URL + '/getseveritycount/' + value + '&medium', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                console.log("thuva" + res.data)
                this.setState({
                    mediumsev: res.data
                })
            })
    }

    getLow(value) {
        axios
            .get(API_BASE_URL + '/getseveritycount/' + value + '&low', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                console.log(res.data)
                this.setState({
                    lowsev: res.data
                })
            })
    }

    getopenhigh(value) {
        axios
            .get(API_BASE_URL + '/getopenseveritycount/' + value + '&high', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                console.log(res.data)
                this.setState({
                    openhighsev: res.data
                })
            })
    }



    onChangeRole = (value) => {

        this.setState({ projectId: value })
        this.getStatusNew(value);
        this.getStatusOpen(value);
        this.getStatusReOpen(value);
        this.getStatusRejected(value);
        this.getStatusFixed(value);
        this.getStatusDefered(value);
        this.getStatusClose(value);
        this.getLow(value);
        this.getMedium(value);
        this.getHigh(value);
        this.getHigh1(value);
        this.getLow1(value);
        this.getMedium1(value);
        this.getopenhigh(value);
        this.getdefectcount(value);
        console.log(value)

    }


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


    getStatusNew(value) {
        axios
            .get(API_BASE_URL + '/getStatusNew/' + value, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                this.setState({
                    StatusNew: res.data
                })

            })
    }

    getStatusOpen(value) {
        axios
            .get(API_BASE_URL + '/getStatusOpen/' + value, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                this.setState({
                    StatusOpen: res.data
                })
            })
    }

    getStatusClose(value) {
        axios
            .get(API_BASE_URL + '/getStatusClose/' + value, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                this.setState({
                    StatusClose: res.data
                })
            })

    }
    getStatusRejected(value) {
        axios
            .get(API_BASE_URL + '/getStatusRejected/' + value, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                this.setState({
                    StatusRejected: res.data
                })
            })

    }
    getStatusReOpen(value) {
        axios
            .get(API_BASE_URL + '/getStatusReOpen/' + value, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                this.setState({
                    StatusReOpen: res.data
                })
            })

    }

    getStatusFixed(value) {
        axios
            .get(API_BASE_URL + '/getStatusFixed/' + value, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                this.setState({
                    StatusFixed: res.data
                })
            })

    }
    getStatusDefered(value) {
        axios
            .get(API_BASE_URL + '/getStatusDefered/' + value, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                this.setState({
                    StatusDefered: res.data
                })
            })

    }
    getHigh1(value) {
        axios
            .get(API_BASE_URL + '/getprioritycount/' + value + '&high', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                let color = ""
                if (3 > res.data) {
                    color = '#12cc1f'
                } else {
                    color = '#d60f0f'
                }

                console.log(res.data)
                this.setState({
                    high: res.data,
                    color
                })
                console.log(this.state.color)
            })
    }


    getLow1() {
        axios
            .get(API_BASE_URL + '/getprioritycount', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                let color = ""
                if (3 > res.data) {
                    color = '#12cc1f'
                } else {
                    color = '#d60f0f'
                }

                console.log(res.data)
                this.setState({
                    low: res.data,
                    color
                })
                console.log(this.state.color)
            })
    }

    getMedium1() {
        axios
            .get(API_BASE_URL + '/getprioritycount', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                let color = ""
                if (3 > res.data) {
                    color = '#12cc1f'
                } else {
                    color = '#d60f0f'
                }

                console.log(res.data)
                this.setState({
                    medium: res.data,
                    color
                })
                console.log(this.state.color)
            })
    }

    getSeverityIndex() {
        axios
            .get(API_BASE_URL + '/getseverityindex', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                let color = ""
                if (3 > res.data) {
                    color = '#12cc1f'
                } else {
                    color = '#d60f0f'
                }

                console.log(res.data)
                this.setState({
                    severityindex: res.data,
                    color
                })
                console.log(this.state.color)
            })
    }

    componentDidMount() {
        console.log("thuva" + this.state.projectId);
        this.getAllUsers();

        this.getConfiguration();
        this.getHigh1();
        this.getHigh();
        this.getMedium();
        this.getLow();
        this.getLow1();
        this.getMedium1();
        this.getSeverityIndex();
        this.getdefectdensity();
        this.getdefectcount();
        this.getStatusClose();
        this.getStatusDefered();
        this.getStatusFixed();
        this.getStatusNew();
        this.getStatusOpen();
        this.getStatusReOpen();
        this.getStatusRejected();
        this.getDefectRatio();
        this.gettotaldefectwithRe();
        this.getallRole();

    }
    getAllUsers = () => {
        var _this = this;
        axios.get(LOGIN_API_BASE_URL + '/getAllUsers', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(function (response) {
                // handle success
                console.log(response.data);
                _this.setState({ getall: response.data });
                // console.log(_this.state.mod);
            });
    }

    getallRole() {
        const drop = []
        var _this = this;
        axios
            .get(API_BASE_URL + "/getallresource", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(function (response) {
                console.log(response.data);
                let d = response.data.map(post => {
                    console.log(post.name + "rommi");
                    console.log(currentuser);
                    if (currentuser) {
                        console.log(currentuser);
                        return <Option value={post.projectId}>{post.projectName}</Option>
                    }
                    // localStorage.getItem(CURRENT_USER)
                })
                _this.setState({ d })
                console.log(drop)
            })
        // const drop = []
        // var _this = this;
        // axios
        //     .get(API_BASE_URL + "/getallresource", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
        //     .then(function (response) {
        //         console.log(response.data);        
        //         let d = response.data.map(post => {
        //             console.log(post.name + "keerthi");
        //             console.log(currentuser);
        //             if (currentuser == post.name) {
        //                 return <Option value={post.projectId}>{post.projectName}</Option>
        //             }
        //         })
        //         _this.setState({ d })
        //         console.log(drop)
        //     })
    }


    getDefectRatio() {
        axios
            .get(API_BASE_URL + '/getremarksratio', { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {

                this.setState({
                    ratio: res.data
                })

            })
    }

    getdefectcount(value) {
        const url = API_BASE_URL + '/getdefectbyprojectcount/' + value;
        axios.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })

            .then(response => this.setState({
                defectcount: response.data,

            }))

            .catch(function (error) {
                console.log(error);
            });

    }
    getdefectdensity() {
        const url = API_BASE_URL + '/getDefectDensity';
        axios.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })

            .then(response => this.setState({
                density: response.data,
            }))
            .catch(function (error) {
                console.log(error);
            });

    }
    gettotaldefectwithRe() {
        var _this = this
        axios
            .get(API_BASE_URL + "/getAllDefects", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(response => {
                console.warn(response.data);
                var openHigh = 0;
                response.data.map((post, index) => {
                    if (post.severity == "High" && post.status == "Open") {
                        openHigh = openHigh + 1;

                    }

                });
                console.log(openHigh)
                _this.setState({ openHigh });

                console.log(this.state.openHigh);

            })
    }

    getConfiguration = () => {
        axios
            .get(API_BASE_URL_PRODUCT + `/getbyusername/` + localStorage.getItem(CURRENT_USER), { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                let selectedlist = res.data[0];
                console.log(selectedlist)
                this.setState({ selectedlist });
                console.log(this.state.selectedlist)
                console.log(res.data[0].dashboardList[0]);
                for (var i = 0; i < 10; i++) {
                    if (res.data[0].dashboardList[i] === "DeveloperDefectDetail") {
                        console.log("name")
                        this.setState({ name: "DeveloperDefectDetail" })
                    } else if (res.data[0].dashboardList[i] === "DeveloperDefectPercentage") {
                        console.log("name1")
                        this.setState({ name1: "DeveloperDefectPercentage" })
                    } else if (res.data[0].dashboardList[i] === "DeveloperDefectStatusChart") {
                        console.log("name2")
                        this.setState({ name2: "DeveloperDefectStatusChart" })
                    } else if (res.data[0].dashboardList[i] === "DeveloperRadarChart") {
                        console.log("name3")
                        this.setState({ name3: "DeveloperRadarChart" })
                    } else if (res.data[0].dashboardList[i] === "DefectTypeDoughnutChart") {
                        console.log("name4")
                        this.setState({ name4: "DefectTypeDoughnutChart" })
                    } else if (res.data[0].dashboardList[i] === "DeveloperLineChart") {
                        console.log("name5")
                        this.setState({ name5: "DeveloperLineChart" })
                    }
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    visibledash(list) {
        console.log(list);
    }


    render() {

        console.log(this.state.highsev)
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

        const data5 = {
            labels: ['High', 'Medium', 'Low'],
            datasets: [
                {
                    data: [this.state.highsev, this.state.mediumsev, this.state.lowsev],
                    backgroundColor: [
                        "#FF6384",
                        "#4CAF50",
                        "#FFCE56",

                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#4CAF50",
                        "#FFCE56",

                    ]
                }]
        };

        return (
            <React.Fragment>
                <Row>
                    <br></br>
                    <Col span={20}>
                        <Breadcrumb style={{
                            marginBottom: '6px',
                            marginTop: '-10px'
                        }}>

                            <Breadcrumb.Item>Dashboard Component</Breadcrumb.Item>
                            <Breadcrumb.Item>PM Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={3}>
                        <Select
                            placeholder="Select the Project"
                            style={{ width: 120 }}
                            onChange={this.onChangeRole}
                        >
                            {this.state.d}
                        </Select>
                    </Col>
                    <Col span={1} >
                        <div id="components-dropdown-demo-dropdown-button" style={{ marginLeft: "-2.1em" }}>
                            <DashboardConfig dashconfig={this.visibledash} reload={this.getConfiguration} list={this.selectedlist} />
                        </div>
                    </Col>
                </Row>
                <div style={{

                    padding: "0 0 10px 0 "
                }}>
                    <Row>
                        <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="High Severity"
                                    value={this.state.highsev}
                                    valueStyle={{ color: this.state.color }}
                                    prefix={<Icon type="arrow-up" style={{ color: "red" }} />}
                                // suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 5px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Medium Severity"
                                    value={this.state.mediumsev}
                                    valueStyle={{ color: this.state.color }}
                                    prefix={<Icon type="arrow-up" style={{ color: "orange" }} />}
                                // suffix="%"
                                />
                            </Card></Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 5px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Low Severity"
                                    value={this.state.lowsev}
                                    valueStyle={{ color: this.state.color }}
                                    prefix={<Icon type="arrow-down" style={{ color: "green" }} />}
                                // suffix="%"
                                />
                            </Card></Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Severity Index"
                                    value={this.state.severityindex}
                                    valueStyle={{ color: '#007673' }}
                                    precision={3}
                                    prefix={<Icon type="sync" spin />}
                                />
                            </Card></Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Defect to Remarks Ratio"
                                    value={this.state.ratio}
                                    precision={3}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="safety-certificate" theme="filled" />}
                                // suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 5px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Defect Density"
                                    value={this.state.density}
                                    precision={3}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="fund" theme="filled" />}
                                // suffix="%"
                                />
                            </Card></Col>
                        <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Total Defect"

                                    value={this.state.defectcount}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="safety-certificate" theme="filled" />}
                                />
                            </Card>
                        </Col>

                        <Col span={6}>
                            <Card style={{ margin: "10px 5px 0 -2px", borderRadius: "5px" }}>
                                <Statistic
                                    title="Total Open Severity High"
                                    value={this.state.openhighsev}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<Icon type="safety-certificate" theme="filled" style={{ color: '#e30931' }} />}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div>
                    <div>
                        <br />
                    </div>

                    <Row style={{ margin: "-20px 0 0 0 " }}>
                        <Col span={10} key="1">
                            <ChartBar projectId={this.props.projectId} />
                        </Col>
                        <Col span={14} key="2">
                            <Card title="Defects Status" style={{ borderRadius: "5px", margin: "0 0 0 5px" }}>
                                <div >
                                    <label>New</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        percent={this.state.StatusNew} status="active"
                                    />
                                    <label>Opened</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#eee000',
                                            '100%': '#766766',
                                        }}
                                        percent={this.state.StatusOpen} status="active"
                                    />
                                    <label>Fixed</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#11FF00',
                                            '100%': '#91C8F9',
                                        }}
                                        percent={this.state.StatusFixed} status="active"
                                    />
                                    <label>Reopen</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#F60C0C',
                                            '100%': '#171515',
                                        }}
                                        percent={this.state.StatusReOpen} status="active"
                                    />
                                    <label>Closed</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#095725',
                                            '100%': '#B1FF29',
                                        }}
                                        percent={this.state.StatusClose} status="active"
                                    />
                                    <label>Rejected</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#FFF700',
                                            '100%': '#4BF90C',
                                        }}
                                        percent={this.state.StatusRejected} status="active"
                                    />
                                    <label>Deferred</label>
                                    <Progress
                                        strokeColor={{
                                            '0%': '#0A0A00',
                                            '100%': '#FF5500',
                                        }}
                                        percent={this.state.StatusDefered} status="active"
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div>
                        <br />
                    </div>
                    <Row style={{ margin: "-10px 0 0 0 " }}>
                        <Col span={10} key="3">
                            <Card title="Severity Defect Types" style={{ minHeight: '22.4rem', height: '22.4rem', borderRadius: "5px", margin: "0 0 0 5px", background: "#fff" }} >
                                <Chart type="pie" data={data5} style={{ padding: "0 0 70px 0" }} />
                            </Card>
                        </Col>
                        <Col span={14} key="4">
                            <Card title="Ongoing Project Updates" style={{ minHeight: '22.4rem', height: '22.4rem', borderRadius: "5px", margin: "0 0 0 5px" }}>
                                <Timeline>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item color="red">
                                        Solve initial network problems 1
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        Technical testing
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        Manual testing
                                    </Timeline.Item>
                                    <Timeline.Item color="red">
                                        Solve initial network problems 2
                                    </Timeline.Item>
                                </Timeline>
                            </Card>

                        </Col>

                    </Row>
                    <div style={{ marginBottom: "0.4em" }}></div>
                    <Row>
                        {this.state.name === "DeveloperDefectDetail" ?
                            <Col span={12} key="5">
                                <Row>
                                    <div
                                        style={{
                                            padding: 24,
                                            background: '#fff',
                                            border: "#605877",
                                            zIndex: "5000",
                                            width: "532px",
                                            borderRadius: "0.2em",
                                            height: '280px',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                        }}>

                                        <DeveloperDefectDetail />
                                    </div>
                                </Row>
                            </Col> : ''}
                        <div style={{ marginBottom: "-1em" }}></div>
                        <Col span={12} key="6">


                            {this.state.name1 === "DeveloperDefectPercentage" ? <div
                                style={{
                                    padding: 24,
                                    background: '#fff',
                                    border: "#605877",
                                    zIndex: "5000",
                                    width: "530px",
                                    borderRadius: "0.2em",
                                    height: '280px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                }}>

                                <DeveloperDefectPercentage />

                            </div> : ''}


                        </Col>
                    </Row>

                    <div style={{ marginBottom: "0.4em" }}></div>
                    <Row>
                        {this.state.name2 === "DeveloperDefectStatusChart" ?
                            <Col span={12} key="7" style={{
                                padding: 2,
                                background: '#fff',
                                border: "#605877",
                                zIndex: "5000",
                                width: "532px",
                                borderRadius: "0.2em",
                                minHeight: '100%',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                            }}>

                                <DeveloperDefectStatusChart />
                            </Col> : ''}

                        <div style={{ marginBottom: "0.1em" }}></div>
                        {this.state.name3 === "DeveloperRadarChart" ? <Col span={10}>

                            <div
                                style={{
                                    padding: 14,
                                    marginLeft: "0.5em",
                                    background: '#fff',
                                    border: "#605877",
                                    zIndex: "5000",
                                    width: "532px",
                                    borderRadius: "0.2em",
                                    minHeight: '80%',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                }}>
                                <DeveloperRadarChart />
                            </div>


                        </Col> : ''}
                    </Row>
                    <div style={{ marginBottom: "0.4em" }}></div>
                    <Row>

                        {this.state.name4 === "DefectTypeDoughnutChart" ? <Col span={12} key="8" style={{
                            padding: 2,
                            background: '#fff',
                            border: "#605877",
                            zIndex: "5000",
                            width: "532px",
                            borderRadius: "0.2em",
                            height: "25em",
                            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                        }}>

                            <DefectTypeDoughnutChart />
                        </Col> : ''}

                        <div style={{ marginBottom: "0.1em" }}></div>
                        {this.state.name5 === "DeveloperLineChart" ? <Col span={10} key="9">

                            <div
                                style={{
                                    padding: 14,
                                    marginLeft: "0.5em",
                                    background: '#fff',
                                    border: "#605877",
                                    zIndex: "5000",
                                    width: "532px",
                                    borderRadius: "0.2em",
                                    minHeight: '80%',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                }}>
                                <DeveloperLineChart />
                            </div>


                        </Col> : ''}
                    </Row>


                </div>
            </React.Fragment>

        );
    }
}

export default ProjectManagerDashboard;