import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { ROLE_NAME, ACCESS_TOKEN } from '../../constants/index';
import { getQaPrivilegeByName, getAllQaPrivilege, getAllPrivileges, notificationmsg } from '../../services/PrivilegeConfig';
//import './Dashboard.css';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderComponent extends React.Component {

  state = {
    CompanyDashboard: false,
    DefectDashboard: false,
    DeveloperDashboard: false,
    PMDashboard: false,
    QADashboard: false,
    ProductAdministration: false,
    CompanyAdministration: false,
    ManageCompany: false,
    ManageModule: false,
    ManageProject: false,
    ManageDefect: false,
    Generalsetting: false,
    LookAndFeel: false,
    ProfileSetting: false,
    GeneralConfiguration: false,
    TroubleshootAndSupport: false,
    ManageAuditLog: false,
    CompanyPrivilege: false,
    ProjectPrivilege: false,
    QAPrivilege: false,
    TecLeadPrivilege: false,
    ProjectConfigurePrivilege: false,
    DeveloperConfigurePrivilege: false,
    ProjectManagerConfigurePrivilege: false,
    HRConfigurePrivilege: false,
    privilege: false,
    ProjectAllocation: false
  };

  componentDidMount() {
    this.privilegeconfig();
  }

  privilegeconfig() {

    getAllPrivileges()
      .then(res => {
        console.log(res)
        res.map(post => {
          if (!post.status) {
            console.log("debug" + post.privilegeName)
            if (post.privilegeName == "CompanyDashboard") {
              console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
              this.setState({
                CompanyDashboard: true
              })
            } else if (post.privilegeName == "DefectDashboard") {
              this.setState({
                DefectDashboard: true
              })
            } else if (post.privilegeName == "DeveloperDashboard") {
              console.log("debug" + post.privilegeName)
              this.setState({
                DeveloperDashboard: true
              })
            } else if (post.privilegeName == "PMDashboard") {
              console.log("debug" + post.privilegeName)
              this.setState({
                PMDashboard: true
              })
            } else if (post.privilegeName == "QADashboard") {
              console.log("debug" + post.privilegeName)
              this.setState({
                QADashboard: true
              })
            } else if (post.privilegeName == "ProductAdministration") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ProductAdministration: true
              })
            } else if (post.privilegeName == "CompanyAdministration") {
              console.log("debug" + post.privilegeName)
              this.setState({
                CompanyAdministration: true
              })
            } else if (post.privilegeName == "ManageCompany") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ManageCompany: true
              })
            } else if (post.privilegeName == "ManageModule") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ManageModule: true
              })
            } else if (post.privilegeName == "ManageProject") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ManageProject: true
              })
            } else if (post.privilegeName == "ManageDefect") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ManageDefect: true
              })
            } else if (post.privilegeName == "Generalsetting") {
              console.log("debug" + post.privilegeName)
              this.setState({
                Generalsetting: true
              })
            } else if (post.privilegeName == "LookAndFeel") {
              console.log("debug" + post.privilegeName)
              this.setState({
                LookAndFeel: true
              })
            } else if (post.privilegeName == "ProfileSetting") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ProfileSetting: true
              })
            } else if (post.privilegeName == "GeneralConfiguration") {
              console.log("debug" + post.privilegeName)
              this.setState({
                GeneralConfiguration: true
              })
            } else if (post.privilegeName == "TroubleshootAndSupport") {
              console.log("debug" + post.privilegeName)
              this.setState({
                TroubleshootAndSupport: true
              })
            } else if (post.privilegeName == "ManageAuditLog") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ManageAuditLog: true
              })
            } else if (post.privilegeName == "CompanyPrivilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                CompanyPrivilege: true
              })
            } else if (post.privilegeName == "ProjectPrivilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ProjectPrivilege: true
              })
            } else if (post.privilegeName == "QAPrivilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                QAPrivilege: true
              })
            } else if (post.privilegeName == "TecLeadPrivilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                TecLeadPrivilege: true
              })
            } else if (post.privilegeName == "ProjectConfigurePrivilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ProjectConfigurePrivilege: true
              })
            } else if (post.privilegeName == "DeveloperConfigurePrivilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                DeveloperConfigurePrivilege: true
              })
            } else if (post.privilegeName == "ProjectManagerConfigurePrivilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ProjectManagerConfigurePrivilege: true
              })
            }
            else if (post.privilegeName == "HRConfigurePrivilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                HRConfigurePrivilege: true
              })
            } else if (post.privilegeName == "privilege") {
              console.log("debug" + post.privilegeName)
              this.setState({
                privilege: true
              })
            } else if (post.privilegeName == "ProjectAllocation") {
              console.log("debug" + post.privilegeName)
              this.setState({
                ProjectAllocation: true
              })
            }
          }
        });
      });
    console.log(this.state.AddDefectStatus)
  }

  logout = () => { };
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.sidebar.isCollapsed}
        width={240}
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          boxShadow: "2px 0 6px rgba(0,21,41,.35)"
        }}

      >

        <div className="logo" >Defect Tracker</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
        >
          {/* Dashboard Menu -----------------------------------------------------------------*/}
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="pie-chart" />
                <span>Dashboard</span>
              </span>
            }
          >
            {this.state.CompanyDashboard ? '' :
              <Menu.Item key="1">
                <Link to="/home">Company</Link>
              </Menu.Item>}
            {this.state.DefectDashboard ? '' :
              <Menu.Item key="2">
                <Link to="/dashboard/defect">Defect</Link>
              </Menu.Item>}
            {this.state.DeveloperDashboard ? '' :
              <Menu.Item key="3">
                <Link to="/dashboard/developer">Developer</Link>
              </Menu.Item>}
            {this.state.PMDashboard ? '' :
              <Menu.Item key="4">
                <Link to="/dashboard/projectmanager">Project Manager</Link>
              </Menu.Item>}
            {this.state.QADashboard ? '' :
              <Menu.Item key="5">
                <Link to="/dashboard/qa">QA</Link>
              </Menu.Item>}
          </SubMenu>

          {/* Product Administration Menu  -----------------------------------------------------------------*/}
          {this.state.ProductAdministration ? '' :
            <Menu.Item key="6">
              <Link to="/productadministration">
                <Icon type="project" /><span>Product Administration</span></Link>
            </Menu.Item>}

          {/* Company Administration Menu -----------------------------------------------------------------*/}
          {this.state.CompanyAdministration ? '' :
            <Menu.Item key="7">
              <Link to="/companyadministration">
                <Icon type="project" /><span>Company Administration</span></Link>
            </Menu.Item>}

          {/* Company Menu -----------------------------------------------------------------*/}
          {this.state.ManageCompany ? '' :
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>Company</span>
                </span>
              }
            >
              {/* {localStorage.getItem(ROLE_NAME)==='ROLE_PRODUCT_ADMIN' ? 
            <Menu.Item key="8">
              <Link to="/company">Company</Link>
            </Menu.Item>:""} */}

              <Menu.Item key="8">
                <Link to="/home">Company</Link>
              </Menu.Item>

              <Menu.Item key="9">
                <Link to="/company/hrallocation">HR Allocation</Link>
              </Menu.Item>

              <Menu.Item key="10">
                <Link to="/company/employee">Employee</Link>
              </Menu.Item>
            </SubMenu>}

          {/* Module Menu -----------------------------------------------------------------*/}
          {this.state.ManageModule ? '' :
            <Menu.Item key="11">
              <Link to="/module">
                <Icon type="code-sandbox" /><span>Module</span></Link>
            </Menu.Item>}

          {/* Project Allocation Menu -----------------------------------------------------------------*/}
          {this.state.ProjectAllocation ? '' :
            <Menu.Item key="12">
              <Link to="/projectallocation">
                <Icon type="project" /><span>Project Allocation</span></Link>
            </Menu.Item>}

          {/* Project Menu -----------------------------------------------------------------*/}
          {this.state.ManageProject ? '' :
            <Menu.Item key="13">
              <Link to="/project">
                <Icon type="project" /><span>Manage Project</span></Link>
            </Menu.Item>}


          {/* Defect Menu -----------------------------------------------------------------*/}
          {this.state.ManageDefect ? '' :
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="alert" />
                  <span>Defect</span>
                </span>
              }
            >
              <Menu.Item key="14">
                <Link to="/defect">Defect</Link>
              </Menu.Item>
            </SubMenu>}







          {/* Setting Menu -----------------------------------------------------------------*/}
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="setting" />
                <span>Setting</span>
              </span>
            }
          >
            {this.state.GeneralConfiguration ? '' :
              <Menu.Item key="15">
                <Link to="/settings/generalsetting">General Configuration</Link>
              </Menu.Item>}
            {this.state.LookAndFeel ? '' :
              <Menu.Item key="16">
                <Link to="/settings/lookandfeel">Look and Feel</Link>
              </Menu.Item>}
            <Menu.Item key="17">
              <Link to="/settings/profilescreen">Profile Setting</Link>
            </Menu.Item>
            {this.state.GeneralConfiguration ? '' :
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="setting" />
                    <span>General Configuration</span>
                  </span>
                }
              >


                <Menu.Item key="18">
                  <Link to="/config/priority">Priority</Link>
                </Menu.Item>
                <Menu.Item key="19">
                  <Link to="/config/severity">Severity</Link>
                </Menu.Item>
                <Menu.Item key="20">
                  <Link to="/config/defecttype">Defect Type</Link>
                </Menu.Item>
                <Menu.Item key="21">
                  <Link to="/config/defectstatus">Defect Status</Link>
                </Menu.Item>
                <Menu.Item key="22">
                  <Link to="/config/projecttypeconfig">Project Type</Link>
                </Menu.Item>
                <Menu.Item key="23">
                  <Link to="/config/projectstatusconfig">Project Status</Link>
                </Menu.Item>
                <Menu.Item key="24">
                  <Link to="/config/designationconfig">Designation Configure</Link>
                </Menu.Item>
              </SubMenu>}
            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icon type="setting" />
                  <span>Troubleshoot and Support</span>
                </span>
              }
            >
              {this.state.ManageAuditLog ? '' :
                <Menu.Item key="25">
                  <Link to="/settings/auditlog">Audit Log</Link>
                </Menu.Item>}
            </SubMenu>
            {this.state.privilege ? '' :
              <SubMenu
                key="sub7"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Privileges</span>
                  </span>
                }
              >
                {this.state.CompanyPrivilege ? '' :
                  <Menu.Item key="26">
                    <Link to="/privilege/company">Company Privileges</Link>
                  </Menu.Item>}
                {this.state.ProjectPrivilege ? '' :
                  <Menu.Item key="27">
                    <Link to="/privilege/project">Project Privileges</Link>
                  </Menu.Item>}
                {this.state.QAPrivilege ? '' :
                  <Menu.Item key="28">
                    <Link to="/privilege/qalead">QA Privilege</Link>
                  </Menu.Item>}
                {this.state.TecLeadPrivilege ? '' :
                  <Menu.Item key="29">
                    <Link to="/privilege/techlead">Tech Lead Privileges</Link>
                  </Menu.Item>}
                {this.state.ProjectConfigurePrivilege ? '' :
                  <Menu.Item key="30">
                    <Link to="/privilege/projectConfig">Project Privilege</Link>
                  </Menu.Item>}
                {this.state.DeveloperConfigurePrivilege ? '' :
                  <Menu.Item key="31">
                    <Link to="/privilege/developer">Developer Privilege</Link>
                  </Menu.Item>}
                {this.state.ProjectManagerConfigurePrivilege ? '' :
                  <Menu.Item key="32">
                    <Link to="/privilege/pm">Project Manager Privilege</Link>
                  </Menu.Item>}
                {this.state.HRConfigurePrivilege ? '' :
                  <Menu.Item key="33">
                    <Link to="/privilege/hr">HR Privilege</Link>
                  </Menu.Item>}
              </SubMenu>}
            {localStorage.getItem(ROLE_NAME) === 'ROLE_HR' ?
              <SubMenu
                key="sub8"
                title={
                  <span>
                    <Icon type="line-chart" />
                    <span>Workflow</span>
                  </span>
                }
              >
                <Menu.Item key="34">
                  <Link to="/workflow/defectroles">Defect Roles Flow</Link>
                </Menu.Item>
                <Menu.Item key="35">
                  <Link to="/workflow/defectstatus">Defect Status Flow</Link>
                </Menu.Item>
              </SubMenu> : ""}
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps(state) {
  return {
    sidebar: state.isCollapsed
  };
}

export default connect(mapStateToProps)(SiderComponent);
