import React from 'react';
import {
    Breadcrumb, Row, Col, Progress, Icon, Button, Menu, message, Dropdown,Select
} from 'antd';
import { Chart } from 'primereact/chart';
import DashboardConfig from './DashboardConfig';
import './index.css';
import { API_BASE_URL, CURRENT_USER, API_BASE_URL_PRODUCT, ACCESS_TOKEN, LOGIN_API_BASE_URL, EXISTING_EMAIL } from '../../../src/constants/index';import axios from 'axios';

// doughnut data
const doughnutData = {
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

// data for line chart


// handling the menu for filter
function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
}


// filter icon specs
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">
            <Icon type="user" />
            Type 1
      </Menu.Item>
        <Menu.Item key="2">
            <Icon type="user" />
            Type 2
      </Menu.Item>
        <Menu.Item key="3">
            <Icon type="user" />
            Type 3
      </Menu.Item>
    </Menu>
);

const Option = Select.Option;
const currentuser = localStorage.getItem(CURRENT_USER);
class DefectDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        
    }
    state = {
        percent: 70,
       
            filteredInfo: null,
            sortedInfo: null,
            color:'',
            highsev:'',
            mediumsev:'',
            lowsev:'',
          DefectCount: [],
          value:'',
          density:'',
          StatusNew:'',
          StatusOpen:'',
          StatusClose:'',
          StatusRejected:'',
          StatusReOpen:'',
          StatusFixed:'',
          StatusDefered:'',
          ratio:'',
          projectId:'',  
          value:'' ,
        //   value1:'',   
        //   value2:'',
        //   value3:'',
        //   value4:'',
        //   value5:''
    };

    onChangeRole = (value) => {

        this.setState({ projectId: value })
        this.getStatusNew(value);
        this.getStatusOpen(value);
        this.getStatusReOpen(value);
        this.getStatusRejected(value);
        this.getStatusFixed(value);
        this.getStatusDefered(value);
        this.getStatusClose(value);
       
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
         
      

    componentDidMount() {
    
 
        console.log("" + this.state.projectId);
        this.getAllUsers();
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
      
      getallRole = ()=> {
        const drop = []
        var _this = this;
        axios
            .get(API_BASE_URL + "/getAllRole", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
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
//     getStatusClose(value) {
//         const url = API_BASE_URL+'/getStatusClose'+ value;
//         axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
//           .then(response => this.setState({
//             value1: response.data,
//           }))
//           .catch(function (error) {
//             console.log(error);
//           });
//     console.log(this.state.value1)
//   }
  
    getStatusRejected(value) {
        const url = API_BASE_URL+'/getStatusRejected'+ value;
        axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
          .then(response => this.setState({
            value2: response.data,
          }))
          .catch(function (error) {
            console.log(error);
          });
    console.log(this.state.value2)
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

    getStatusDefered(value) {
        const url = API_BASE_URL+'/getStatusDefered'+ value;
        axios.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
          .then(response => this.setState({
            value5: response.data,
          }))
          .catch(function (error) {
            console.log(error);
          });
    console.log(this.state.value5)
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

// componentDidMount(){
//     console.log(this.props.match.params.username);

//     this.getStatusClose();
//        this.getStatusDefered();
//        this.getStatusFixed();
//     //    this.getStatusNew();
//        this.getStatusOpen();
//        this.getStatusReOpen();
//        this.getStatusRejected();
//        this.getdefectcount();
// }


    // componentWillMount() {
    // }



    render() {
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
            <React.Fragment>

                {/* BreadCrumbs */}

                <Row>
                    <br></br>
                    <Col span={18}>
                        <Breadcrumb style={{
                            marginBottom: '6px',
                            marginTop: '-10px'
                        }}>
                            <Breadcrumb.Item>Dashboard Component</Breadcrumb.Item>
                            <Breadcrumb.Item>Defect Dashboard</Breadcrumb.Item>

                        </Breadcrumb>
                    </Col>
                    <Col span={4}>
            <Select
              placeholder="Select the Project"
              style={{ width: 120 }}
               onChange={this.onChangeRole}
            >
              {this.state.d}
            </Select>
          </Col>
                    <Col span={2}>
                        <div id="components-dropdown-demo-dropdown-button" style={{ marginLeft: "-2.1em" }}>
                            <DashboardConfig />
                        </div>
                        </Col>
                </Row>


                {/* dashboard starts here  */}
                <div className="gutter-example" style={{ textAlign: "center" }}>

                    {/* the embedded and seperatd row  - row1 */}
                    <Row gutter={25}>
                        
                         {/* Rejected defects box */}
                         <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        border: "#605877",
                                        textShadow: " 1px 6px 7px #c0c1c4",
                                        zIndex: "5000",
                                        borderRadius: "0.7em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Total Defects</h1>
                                        <br></br>
                                        <div>
                                            <Progress strokeColor="e41749" type="dashboard" percent={this.state.defectcount} format={percent => `${percent} `} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* opened defects box */}
                        <Col className="gutter-row" span={6} style={{ minHeight: "4em" }}>

                            {/* opened defects box */}
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        minHeight: '80%',
                                        textShadow: " 1px 6px 7px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.7em",
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }} className="res">
                                    <div style={{borderRadius: '0.4em'}}>
                                        <h1>Opened Defects</h1>
                                        <br></br>
                                        <div>
                                            <Progress strokeColor="454d66" type="dashboard" percent={this.state.StatusOpen} format={percent => `${percent} `} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* fixed defects box */}
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        textShadow: " 1px 6px 7px #c0c1c4",
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.7em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Fixed Defects</h1>
                                        <br></br>
                                        <div>
                                            <Progress strokeColor="ff8a5c" type="dashboard" percent={this.state.StatusFixed} format={percent => `${percent} `} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* reopened defects box */}
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">
                                <div
                                    style={{
                                        padding: "10px 0 10px 0",
                                        background: '#fff',
                                        border: "#605877",
                                        textShadow: " 1px 6px 7px #c0c1c4",
                                        zIndex: "5000",
                                        borderRadius: "0.7em",
                                        minHeight: '80%',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>
                                    <div>
                                        <h1>Reopened Defects</h1>
                                        <br></br>
                                        <div>
                                            <Progress strokeColor="58b368" type="dashboard" percent={this.state.StatusReOpen} format={percent => `${percent} `} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                       

                    </Row>
                </div>



                {/* Row 2 for big area */}
                <Row gutter={10} style={{ textAlign: "center" }}>

                    {/* column 1 for row 2.. it includes 2 rows to seperate vertically  */}
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box" >

                            {/* progress lines starts here */}
                            <Row>

                                <div
                                    style={{
                                        padding: 24,
                                        borderRadius: "0.2em",
                                        background: '#fff',
                                        minHeight: '250px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                                    }}>

                                    <h1>Severity Meter</h1>
                                    <br />


                                    {/* Progress bar 1 - line */}
                                    <Progress
                                        strokeColor={{
                                            '0%': '#834d9b',
                                            '100%': '#d04ed6',
                                        }}
                                        percent={39.9}
                                        status="active"
                                    />
                                    <div style={{ minHeight: "0.8em" }}></div>


                                    {/* Progress bar 2 - line */}
                                    <Progress
                                        strokeColor={{
                                            from: '#1e3c72',
                                            to: '#2a5298',
                                        }}
                                        percent={49.9}
                                        status="active"
                                    />
                                    <div style={{ minHeight: "0.8em" }}></div>


                                    {/* Progress bar 3 - line */}
                                    <Progress
                                        strokeColor={{
                                            '0%': '#fd746c',
                                            '100%': '#ff9068',
                                        }}
                                        percent={59.9}
                                        status="active"
                                    />
                                    <div style={{ minHeight: "0.8em" }}></div>


                                    {/* Progress bar 4 - line */}
                                    <Progress
                                        strokeColor={{
                                            from: '#C02425',
                                            to: '#F0CB35',
                                        }}
                                        percent={89.9}
                                        status="active"
                                    />
                                </div>
                            </Row>
                            {/* progress lines starts here */}

                            {/* little seperator between progress bar and line chart */}
                            <div style={{ marginBottom: "0.7em", marginTop: "1em" }}></div>

                            {/* line chart starts here */}
                            <Row>
                                <div
                                    style={{
                                        padding: 24,
                                        background: '#fff',
                                        border: "#605877",
                                        zIndex: "5000",
                                        borderRadius: "0.2em",
                                        minHeight: '75%',
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
                            {/* line chart ends here */}
                        </div>

                    </Col >

                    {/* alignment adjuster */}
                    <div style={{ marginBottom: "0.6em" }}></div>

                    {/* Column 2 of Row 2 */}
                    < Col className="gutter-row" span={12} >
                        <div
                            style={{
                                padding: 24,
                                background: '#fff',
                                borderRadius: "0.2em",
                                minHeight: '50.9em',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                            }}>

                            {/* Doughnut Chart starts here*/}
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
                        </div>
                    </Col >

                </Row >


            </React.Fragment >

        );
    }
}

export default DefectDashboard;