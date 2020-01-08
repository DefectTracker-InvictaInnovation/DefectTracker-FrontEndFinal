import React, { Component } from "react";
import { API_BASE_URL, CURRENT_USER, API_BASE_URL_PRODUCT, ACCESS_TOKEN, LOGIN_API_BASE_URL, EXISTING_EMAIL } from '../../../src/constants/index';
import { Chart } from "primereact/chart";
import axios from 'axios';
import {
  PageHeader,
  Statistic,
  Col,
  Row,
  Progress,
  Breadcrumb,
  Select
} from "antd";
import DashboardConfig from "./DashboardConfig";

//const InputGroup = Input.Group;
const Option = Select.Option;
const currentuser = localStorage.getItem(CURRENT_USER);
class DevDashboard extends Component {

  state ={
    StatusNew: '',
    StatusOpen: '',
    StatusClose: '',
    StatusRejected: '',
    StatusReOpen: '',
    StatusFixed: '',
    StatusDefered: '',
    DefectCount: [],
    value: '',


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
    // this.getLow(value);
    // this.getMedium(value);
    // this.getHigh(value);
    // this.getHigh1(value);
    // this.getLow1(value);
    // this.getMedium1(value);
    // this.getopenhigh(value);
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



    
componentDidMount() {
    
 
  console.log("thuva" + this.state.projectId);
  this.getAllUsers();

  // this.getConfiguration();
  // this.getHigh1();
  // this.getHigh();
  // this.getMedium();
  // this.getLow();
  // this.getLow1();
  // this.getMedium1();
  // this.getSeverityIndex();
  // this.getdefectdensity();
  // this.getdefectcount();
  // this.getStatusClose();
  // this.getStatusDefered();
  // this.getStatusFixed();
  // this.getStatusNew();
  // this.getStatusOpen();
  // this.getStatusReOpen();
  // this.getStatusRejected();
  // this.getDefectRatio();
  // this.gettotaldefectwithRe();
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


  render() {
    const data = {
      labels: ["New", "Open", "Reject", "Closed","ReOpen","Fixed","Defered"],
      datasets: [
        {
          data: [this.state.StatusNew, this.state.StatusOpen,this.state.StatusClose,this.state.StatusFixed,this.state.StatusReOpen,this.state.StatusRejected,this.state.getStatusDefered],
          backgroundColor: ["#1460db", "#db149c", "#FFCE56", "#cbf207","#4CAF50", "#9c07f2", "#f2071b"],
          hoverBackgroundColor: ["#FF6384", "#4CAF50", "#FFCE56", "#36A2EB","#4CAF50", "#FFCE56", "#36A2EB"]
        }
      ]
    };
  
    const data2 = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          type: "bar",
          label: "Total Defect",
          backgroundColor: "#4CAF50",
          data: [40, 55, 60, 85, 100],
          borderColor: "white",
          borderWidth: 2
        },
        {
          type: "bar",
          label: "Closed Defect",
          backgroundColor: "#FFC107",
          data: [9, 14, 21, 29, 40]
        }
      ]
    };

    const options = {
      responsive: true,
      title: {
        display: true,
        text: " "
      },
      tooltips: {
        mode: "index",
        intersect: true
      }
    };

    const data3 = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running"
      ],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };

    const multiAxisData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Severity",
          fill: false,
          backgroundColor: "#42A5F5",
          borderColor: "#42A5F5",
          yAxisID: "y-axis-1",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Priority",
          fill: false,
          backgroundColor: "#66BB6A",
          borderColor: "#66BB6A",
          yAxisID: "y-axis-2",
          data: [28, 48, 40, 19, 45, 52, 90]
        }
      ]
    };

    const multiAxisOptions = {
      responsive: true,
      hoverMode: "index",
      stacked: false,
      scales: {
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1"
          },
          {
            type: "linear",
            display: true,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              drawOnChartArea: false
            }
          }
        ]
      }
    };

    return (
      <React.Fragment>
        <Row>
        <br></br>
         <Col span={20}>
            <Breadcrumb style={{
                marginBottom: "6px",
                marginTop: "-10px"
              }}>

                <Breadcrumb.Item>Dashboard Component</Breadcrumb.Item>
                <Breadcrumb.Item>Developer Dashboard</Breadcrumb.Item>
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
          <Col span={1}>
             <div id="components-dropdown-demo-dropdown-button" style={{ marginLeft: "-2.1em" }}>
                   <DashboardConfig dashconfig={this.visibledash} reload={this.getConfiguration} list={this.selectedlist} />
               </div> 
          </Col>
        
        </Row>
        <Row style={{ margin: "10px 0 0 0 " }}>
          <Col span={16}>
            <PageHeader
              title="Defect Status Chart"
              style={{ marginRight: "20px" }}
            />
            <div
              style={{
                padding: 24,
                background: "#fff",
                minHeight: 360,
                marginRight: "20px"
              }}
            >
              <Row>
                <Col span={24}>
                  <div
                    style={{ padding: 24, background: "#fff", minHeight: 50 }}
                  >
                    <div className="content-section introduction"></div>
                    <div className="content-section implementation">
                      <br />
                      <Chart type="pie" data={data} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={8}>
            <Col span={24}>
              <PageHeader title="Defect Details" />
              <div style={{ padding: 24, background: "#fff", minHeight: 50 }}>
                <Row>
                  <div className="content-section introduction"></div>
                  <Col span={8}>
                    <Statistic title="Total " value={this.state.defectcount} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="New" value= {1} suffix="/100"   />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Closed" value={1} suffix="/ 100" />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div
                style={{
                  padding: 24,
                  background: "#fff",
                  minHeight: 50,
                  marginTop: "20px"
                }}
              >
                <PageHeader
                  title="Defect"
                  style={{ padding: 0, minHeight: 30 }}
                />
                <Row>
                  <Col span={24}>
                    <h3>New</h3>
                    <Progress percent={55} />
                    <h3>Open</h3>
                    <Progress percent={5} />
                    <h3>Reject</h3>
                    <Progress percent={10} />
                    <h3>Closed</h3>
                    <Progress percent={30} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Col>

          <Col span={12}>
            <br />
            <PageHeader
              title="Total Defect & Closed Defect"
              style={{ marginRight: "20px" }}
            />
            <div
              style={{
                padding: 24,
                background: "#fff",
                minHeight: 250,
                marginRight: "20px"
              }}
            >
              <Row>
                <Col span={24}>
                  <div
                    style={{ padding: 24, background: "#fff", minHeight: 50 }}
                  >
                    <div className="content-section implementation">
                      <Chart type="bar" data={data2} options={options} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={12}>
            <br />
            <PageHeader title="RadarChart" />
            <div style={{ padding: 30, background: "#fff", minHeight: 307 }}>
              <Row>
                <div>
                  <div className="content-section implementation">
                    <Chart type="radar" data={data3} />
                  </div>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        <br />
        <Col span={24}>
          <PageHeader
            title="Severity & Priority"
            style={{ marginRight: "0px" }}
          />
          <div
            style={{
              padding: 24,
              background: "#fff",
              minHeight: 360,
              marginRight: "00px"
            }}
          >
            <div className="content-section implementation">
              <Chart
                type="line"
                data={multiAxisData}
                options={multiAxisOptions}
              />
            </div>
          </div>
        </Col>
      </React.Fragment>
    );
  }
}

export default DevDashboard;
