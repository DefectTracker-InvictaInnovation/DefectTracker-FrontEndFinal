import React from "react";
import {
  Table,
  Divider,
  Modal,
  Button,
  Icon,
  Upload,
  DatePicker,
  Input,
  Col,
  Row,
  Dropdown,
  Menu,
  message
} from "antd";
import Export from "./Export";
import axios from "axios";
import { Breadcrumb } from "antd";
import {ACCESS_TOKEN,API_BASE_URL} from './../../../constants/index'
const { RangePicker } = DatePicker;

const Search = Input.Search;

class AuditLog extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    Data: [],
    audit: [],
    userInput: ""
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }
  handleButtonClick(e) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }

  onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }
  auditSearchview = e => {
    console.log(e);
  };
  onOk(value) {
    console.log("onOk: ", value);
  }

  auditSearch = value => {
    axios
      .get(API_BASE_URL+"/auditLog/" + value,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      .then(resp => {
        let audit = resp.data;
        console.log(audit);

        const search = [];
        audit.map((post, index) => {
          search.push({
            key: index,
            fixDate: post.fixDate,
            user: post.user,
            status: post.status,
            defectId: post.defect.defectId
          });
        });

        if (value != null) {
          this.setState({ Data: search });
        } else {
          this.getAudit();
        }
      });
  };
  onChange(pagination, filters, sorter) {
    console.log("params", pagination, filters, sorter);
  }
  getAudit() {
    axios.get(API_BASE_URL+"/auditLogAll",{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then(resp => {
      let Data = resp.data;

      this.setState({ Data });

      console.log(Data);
    });
  }

  componentDidMount() {
    this.getAudit();
  }
  render() {
    const columns = [
      {
        title: "Date/Time",
        dataIndex: "fixDate",
        filters: [
          {
            text: "Joe",
            value: "Joe"
          },
          {
            text: "Jim",
            value: "Jim"
          },
          {
            text: "Submenu",
            value: "Submenu",
            children: [
              {
                text: "Green",
                value: "Green"
              },
              {
                text: "Black",
                value: "Black"
              }
            ]
          }
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend"]
      },
      {
        title: "Author",
        dataIndex: "user"
      },
      {
        title: "Current Status",
        dataIndex: "status",
        filters: [
          {
            text: "London",
            value: "London"
          },
          {
            text: "New York",
            value: "New York"
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Defect Type",
        dataIndex: "type"
      },
      {
        title: "Priority ",
        dataIndex: "priority"
      },
      {
        title: "Severity",
        dataIndex: "severity"
      },
      {
        title: "Reassign To",
        dataIndex: "reassignTo"
      },
      {
        title: "Defect Id",
        dataIndex: "defectId"
      },
      // {
      //   title: "Action",
      //   key: "action",
      //   render: () => (
      //     <span>
      //       <a onClick={this.showModal}>
      //         <a href="#">
      //           <Icon
      //             type="fullscreen"
      //             style={{ fontSize: "17px", color: "green" }}
      //           />
      //         </a>
      //       </a>
      //     </span>
      //   )
      // }
    ];
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="line-chart" />
          Log Timeline
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="delete" />
          Clear Log
        </Menu.Item>
      </Menu>
    );

    return (
      <React.Fragment>
        <Breadcrumb
          style={{
            margin: "16px 0"
          }}
        >
          <Breadcrumb.Item>Troubleshoot and support</Breadcrumb.Item>
          <Breadcrumb.Item>AuditLog</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: "500px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
          }}
        >
          <Row>
            <Col span={8}>
              <h3>Audit Log</h3>
            </Col>
            <Col span={6} />
            <Col span={7} />
            <Col span={3}>
              <Dropdown.Button overlay={menu} icon={<Icon type="setting" />}>
                Manage Log
              </Dropdown.Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>
              <Export log={this.state.Data}/>
            </Col>
            <Col span={4} />
            <Col span={9}>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                placeholder={["Start Time", "End Time"]}
                onChange={this.onChange}
                onOk={this.onOk}
              />
            </Col>
            <Col span={5}>
              <Search
                placeholder=" search ......"
                onChange={e => this.auditSearchview(e)}
                onSearch={value => {
                  this.auditSearch(value);
                }}
                style={{ width: 215 }}
                enterButton
              />
            </Col>
          </Row>
          <br />
          <Table columns={columns} dataSource={this.state.Data} />
          <Modal
            title=" Log Details"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "60px" }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: "#fff",
                minHeight: "150px"
              }}
            />
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default AuditLog;
