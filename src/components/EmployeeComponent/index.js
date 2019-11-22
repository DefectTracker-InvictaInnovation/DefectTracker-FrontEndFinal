import React from "react";
import { PageHeader, Col } from "antd";
import Employee from "./Employee";

class EmployeeComponent extends React.Component {
 
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSwitchChange } = this.props;
    const routes = [
      {
        path: "",
        breadcrumbName: "Home"
      },
      {
          path: '',
          breadcrumbName: 'Company',
      },
      {
        path: "second",
        breadcrumbName: "Employee"
      }
    ];
    return (
      <React.Fragment>
        <PageHeader title="Employee" breadcrumb={{ routes }} />
        <div
          style={{
            padding: "0 24px 24px 24px",
            background: "#fff",
            minHeight: "500px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
          }}
        >
          <Employee />
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeComponent;
