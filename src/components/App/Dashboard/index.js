import React from 'react';
import {Layout,notification} from 'antd';
import {Route, Switch} from 'react-router-dom';
import './index.css';
import HeaderComponent from '../HeaderComponent';
import SiderComponent from '../SiderComponent';
// Dashboard Components
import DefectDashboard from '../../DashboardComponent/DefectDashboard';
import CompanyDashboard from '../../DashboardComponent/CompanyDashboard';
import DeveloperDashboard from '../../DashboardComponent/DeveloperDashboard';
import ProjectManagerDashboard from '../../DashboardComponent/ProjectManagerDashboard';
import CompanyComponent from '../../CompanyComponent';
import DefectComponent from '../../DefectComponent';
import HRAllocationComponent from '../../HRAllocationComponent';
import EmployeeComponent from '../../EmployeeComponent';
import ModuleComponent from '../../ModuleComponent';
import DefectStatusFlowComponent from '../../WorkFlow/DefectStatusFlow';
import DefectRolesFlowComponent from '../../WorkFlow/DefectRolesFlow';
import ProjectManageAllocation from '../../ProjectAllocationComponent';
import ProjectComponent from '../../ProjectComponent';
import CompanyPrivilege from '../../PrivilegeComponent/CompanyPrivilege';
import ProjectPrivilege from '../../PrivilegeComponent/ProjectPrivilege';
import QAPrivilege from '../../PrivilegeComponent/QALeadPrivilege';
import TechLeadPrivilege from '../../PrivilegeComponent/TechLeadPrivilege';
import QADashboard from '../../DashboardComponent/QADashboard';
import PriorityConfig from '../../SettingComponent/Config/PriorityConfig';
import SeverityConfig from '../../SettingComponent/Config/SeverityConfig';
import DefectStatusConfig from '../../SettingComponent/Config/StatusConfig';
import DefectTypeConfig from '../../SettingComponent/Config/DefectTypeConfig';
import ProjectTypeConfig from '../../SettingComponent/Config/ProjectTypeConfig';
import ProjectStatusConfig from '../../SettingComponent/Config/ProjectStatusConfig';
import DefectRelease from '../../SettingComponent/Config/DefectReleaseConfig';
import EmployeeRole from '../../SettingComponent/Config/EmployeeRoleConfig'
import DesignationConfig from '../../SettingComponent/Config/DesignationConfig';
import AuditLog from '../../SettingComponent/GeneralConfiguration/AuditLog';
import LookAndFeel from '../../SettingComponent/GeneralConfiguration/LookAndFeel';
import GeneralSetting from '../../SettingComponent/GeneralConfiguration/GeneralSetting';
import CompanyAdministration from '../../CompanyAdministrationComponent/';
import ProfileScreen from '../../SettingComponent/ProfileScreen';
import ProductAdministration from '../../ProductAdministration';
import Configuration from '../../CompanyComponent/Configuration';
import ProjectConfigurePrivilege from '../../PrivilegeComponent/ProjectConfigurePrivilege';
import DefectTypeConfigcom from '../../CompanyComponent/ConfigTable/DefectTypeConfig';
import PriorityConfigcom from '../../CompanyComponent/ConfigTable/PriorityConfig';
import SeverityConfigcom from '../../CompanyComponent/ConfigTable/SeverityConfig';
import DefectStatusConfigcom from '../../CompanyComponent/ConfigTable/StatusConfig';
import Profile from '../User/Profile';
import PrivateRoute from '../Login/util/PrivateRoute';
import { ROLE_NAME } from '../../../constants/index';
import { IS_AUTHENTICATED } from '../../../constants/index';
import {getUserProfile} from '../Login/util/ApiUtil';
//for logout
import { ACCESS_TOKEN ,CURRENT_USER} from '../../../constants/index';
import { isEmptyStatement } from '@babel/types';
import { fromJS } from 'immutable';
import DevelpoerPrivilege from '../../PrivilegeComponent/DeveloperPrivilege';
import ProjectManagerPrivilege from '../../PrivilegeComponent/ProjectMangerPrivilege';
import HRPrivilege from '../../PrivilegeComponent/HRPrivilege';
import {getAllPrivileges,notificationmsg} from '../../../services/PrivilegeConfig';
import history from '../Login/util/history';
import NotFound from '../../App/Login/util/NotFound';
// Company Components
const {Content, Footer} = Layout;
const PropsRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={props => <Component {...props} />}/>
    );
  };
  
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

          currentUser: null,
          isAuthenticated:true,
          isLoading: false,
          role:'',
          user:'',
          logginStatus: true,
          DefectDashboard:false,
          CompanyDashboard:false,
          DeveloperDashboard:false,
          PMDashboard:false,
          ManageCompany:false,
          ManageDefect:false,
          HRAllocation:false,
          ManageEmployee:false,
          ManageModule:false,
          DefectStatusFlow:false,
          DefectRolesFlow:false,
          ProjectAllocation:false,
          ManageProject:false,
          CompanyPrivilege:false,
          ProjectPrivilege:false,
          QAPrivilege:false,
          TecLeadPrivilege:false,
          QADashboard:false,
          PriorityConfig:false,
          SeverityConfig:false,
          DefectStatusConfig:false,
          DefectTypeConfig:false,
          ManageAuditLog:false,
          LookAndFeel:false,
          Generalsetting:false,
          CompanyAdministration:false,
          ProfileSetting:false,
          ProductAdministration:false,
          GeneralConfiguration:false,
          ProjectConfigurePrivilege:false,
          DefectTypeConfigcom:false,
          PriorityConfigcom:false,
          SeverityConfigcom:false,
          DefectStatusConfigcom:false,
          DeveloperPrivilege:false,
          PMPrivilege:false,
          HRPrivilege:false,
          ProjectTypeConfig:false,
          ProjectStatusConfig:false,
          DesignationConfig:false,
          DefectReleaseConfig:false,
          EmployeeRoleConfig:false,
        }

        this.events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress"
          ];
           this.handleLogout = this.handleLogout.bind(this);
           this.warn = this.warn.bind(this);
           this.logout = this.logout.bind(this);
           this.resetTimeout = this.resetTimeout.bind(this);
       
           for (var i in this.events) {
             window.addEventListener(this.events[i], this.resetTimeout);
           }
       
           this.setTimeout();
        }


    privilegeconfig(){
  
    getAllPrivileges()
    .then(res=>{
      console.log(res)
     res.map(post=>{
        if(!post.status){
        console.log("debug"+post.privilegeName)
        if(post.privilegeName=="DefectDashboard"){
        this.setState({
            DefectDashboard:true
        })
      }else if(post.privilegeName=="CompanyDashboard"){
        this.setState({
            CompanyDashboard:true
        })
      }else if(post.privilegeName=="DeveloperDashboard"){
        console.log("debug"+post.privilegeName)
        this.setState({
            DeveloperDashboard:true
        })
      }else if(post.privilegeName=="PMDashboard"){
        console.log("debug"+post.privilegeName)
        this.setState({
            PMDashboard:true
        })
      }else if(post.privilegeName=="ManageCompany"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ManageCompany:true
        })
      }else if(post.privilegeName=="ManageDefect"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ManageDefect:true
        })
      }else if(post.privilegeName=="HRAllocation"){
        console.log("debug"+post.privilegeName)
        this.setState({
            HRAllocation:true
        })
      }else if(post.privilegeName=="ManageEmployee"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ManageEmployee:true
        })
      }else if(post.privilegeName=="ManageModule"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ManageModule:true
        })
      }else if(post.privilegeName=="DefectStatusFlow"){
        console.log("debug"+post.privilegeName)
        this.setState({
            DefectStatusFlow:true
        })
      }else if(post.privilegeName=="DefectRolesFlow"){
        console.log("debug"+post.privilegeName)
        this.setState({
            DefectRolesFlow:true
        })
      }else if(post.privilegeName=="ProjectAllocation"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ProjectAllocation:true
        })
      }else if(post.privilegeName=="ManageProject"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ManageProject:true
        })
      }else if(post.privilegeName=="CompanyPrivilege"){
        console.log("debug"+post.privilegeName)
        this.setState({
            CompanyPrivilege:true
        })
      }else if(post.privilegeName=="ProjectPrivilege"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ProjectPrivilege:true
        })
      }else if(post.privilegeName=="QAPrivilege"){
        console.log("debug"+post.privilegeName)
        this.setState({
            QAPrivilege:true
        })
      }else if(post.privilegeName=="TecLeadPrivilege"){
        console.log("debug"+post.privilegeName)
        this.setState({
            TecLeadPrivilege:true
        })
      }else if(post.privilegeName=="QADashboard"){
        console.log("debug"+post.privilegeName)
        this.setState({
            QADashboard:true
        })
      }else if(post.privilegeName=="PriorityConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
            PriorityConfig:true
        })
      }else if(post.privilegeName=="SeverityConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
            SeverityConfig:true
        })
      }else if(post.privilegeName=="DefectStatusConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
            DefectStatusConfig:true
        })
      }else if(post.privilegeName=="DefectTypeConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
            DefectTypeConfig:true
        })
      }else if(post.privilegeName=="ManageAuditLog"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ManageAuditLog:true
        })
      }else if(post.privilegeName=="LookAndFeel"){
        console.log("debug"+post.privilegeName)
        this.setState({
            LookAndFeel:true
        })
      }else if(post.privilegeName=="Generalsetting"){
        console.log("debug"+post.privilegeName)
        this.setState({
            Generalsetting:true
        })
      }else if(post.privilegeName=="CompanyAdministration"){
        console.log("debug"+post.privilegeName)
        this.setState({
            CompanyAdministration:true
        })
      }else if(post.privilegeName=="ProfileSetting"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ProfileSetting:true
        })
      }else if(post.privilegeName=="ProductAdministration"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ProductAdministration:true
        })
      }else if(post.privilegeName=="GeneralConfiguration"){
        console.log("debug"+post.privilegeName)
        this.setState({
            GeneralConfiguration:true
        })
      }else if(post.privilegeName=="ProjectConfigurePrivilege"){
        console.log("debug"+post.privilegeName)
        this.setState({
            ProjectConfigurePrivilege:true
        })
      }else if(post.privilegeName=="DefectTypeConfigcom"){
        console.log("debug"+post.privilegeName)
        this.setState({
            DefectTypeConfigcom:true
        })
      }else if(post.privilegeName=="PriorityConfigcom"){
        console.log("debug"+post.privilegeName)
        this.setState({
            PriorityConfigcom:true
        })
      }else if(post.privilegeName=="SeverityConfigcom"){
        console.log("debug"+post.privilegeName)
        this.setState({
            SeverityConfigcom:true
        })
      }else if(post.privilegeName=="DefectStatusConfigcom"){
        console.log("debug"+post.privilegeName)
        this.setState({
            DefectStatusConfigcom:true
        })
      }else if(post.privilegeName=="DeveloperPrivilege"){
        console.log("debug"+post.privilegeName)
        this.setState({
            DeveloperPrivilege:true
        })
      }else if(post.privilegeName=="PMPrivilege"){
        console.log("debug"+post.privilegeName)
        this.setState({
            PMPrivilege:true
        })
      }else if(post.privilegeName=="PMPrivilege"){
        console.log("debug"+post.privilegeName)
        this.setState({
            PMPrivilege:true
        })
      }else if(post.privilegeName=="ProjectTypeConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
          ProjectTypeConfig:true
        })
      }else if(post.privilegeName=="ProjectStatusConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
          ProjectStatusConfig:true
        })
      }else if(post.privilegeName=="DesignationConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
          DesignationConfig:true
        })
      }else if(post.privilegeName=="DefectReleaseConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
          DefectReleaseConfig:true
        })
      }else if(post.privilegeName=="EmployeeRoleConfig"){
        console.log("debug"+post.privilegeName)
        this.setState({
          EmployeeRoleConfig:true
        })
      }
        }
     });
    });
 console.log(this.state.AddDefectStatus)
  }


clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    // this.warnTimeout = setTimeout(this.warn, 16 * 1000);

    this.logoutTimeout = setTimeout(this.handleLogout ,800 * 1000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    alert("You will be logged out automatically in 1 minute.");
  }

  logout() {
    // Send a logout request to the API
    console.log("Sending a logout request to the API...");
    this.setState({ logginStatus: false });
    // this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }


        handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(IS_AUTHENTICATED);
            localStorage.removeItem(ROLE_NAME);
            localStorage.removeItem(CURRENT_USER);

            this.setState({
              currentUser: null,
             
            });
        
            this.props.history.push(redirectTo);
            
            notification[notificationType]({
              message: 'Defect Tracker',
              description: description,
            });
            this.destroy();
          }
          componentDidMount(){
            console.log(localStorage.getItem(ROLE_NAME));
            console.log(localStorage.getItem(IS_AUTHENTICATED));
            console.log(localStorage.getItem(CURRENT_USER));

             const username = this.currentUser;
            // if(localStorage.getItem(ACCESS_TOKEN).length>0){
                  this.setState({
                    isAuthenticated:"true",
                    role:localStorage.getItem(ROLE_NAME)
                  })
            //   }
              this.gett();
            
                this.privilegeconfig();
              getUserProfile(localStorage.getItem(CURRENT_USER)) .then(response => {
                console.log(response.data);
                  this.setState({
                      user: response.data.currentUser,
                      isLoading: false
                  });
              })
              console.log(this.state.user);
          }
          gett(){
            console.log(this.state.isAuthenticated);
          }
    render() {
        return (
    
            <Layout style={{
                minHeight: '100vh'
            }}>
            
                <Route exact path="/">
                    <SiderComponent/>
                </Route>

                <Layout>
                <Route path="/" 
                    render={(props) => 
                    <HeaderComponent   
                        isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)} 
                        currentUser={localStorage.getItem(CURRENT_USER)} 
                        handleLogout={()=>this.handleLogout()} {...props} />}>
                </Route>
                    

                    <Content
                        style={{
                        margin: '24px 16px 0'
                    }}>
                               
                        <Switch>
                        <Route path="/notfound" component={NotFound}/>
                         
                                <Route path="/home" component={  this.state.CompanyDashboard?  NotFound  :CompanyDashboard }/>
                            
                           
                                <Route path="/dashboard/defect" component={ this.state.DefectDashboard ? NotFound:DefectDashboard}/>}


                                <Route path="/users/:username" render={(props) => 
                                    <Profile 
                                        isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)} 
                                        currentUser={localStorage.getItem(CURRENT_USER)} 
                                        {...props}  />}>
                                </Route>

                       
                            <Route path='/dashboard/developer'>
                            {this.state.DeveloperDashboard ? <NotFound/>:
                                <DeveloperDashboard/>}
                            </Route>
                       
                            <Route exact path='/dashboard/projectmanager'>
                            {this.state.PMDashboard ?  <NotFound/>:   <ProjectManagerDashboard/>}
                            </Route>
                       
                            <Route path='/dashboard/qa'>
                            {this.state.QADashboard ?  <NotFound/>:
                                <QADashboard/>}
                            </Route>

                            {/* Product Administration Route*/}
                             
                            <Route path='/productadministration'>
                            {this.state.ProductAdministration ? <NotFound/>:   
                                <ProductAdministration/>}
                            </Route>
                            
                            {/* Company Administration Route*/}
                            
                            <Route path='/companyadministration'>
                            {this.state.CompanyAdministration ?  <NotFound/>:
                                <CompanyAdministration/>}
                            </Route>

                            {/* Defect Route*/}
                           
                            <Route path='/defect'>
                            {this.state.ManageDefect ?  <NotFound/>:
                                <DefectComponent/>}
                            </Route>

                            {/* Company Route*/}
                          
                            <Route exact path='/company'>
                            {this.state.ManageCompany ? <NotFound/>:
                                <CompanyComponent/>}
                                </Route> 

                            
                            {/* Company Route New Add*/}
                           
                            <Route exact path='/config'>
                            {this.state.GeneralConfiguration ?  <NotFound/>:
                                <Configuration/>}
                                </Route> 
                               
                            <Route exact path='/DefectType'>
                                  {this.state.DefectTypeConfigcom ?  <NotFound/>:
                                <DefectTypeConfigcom/>}
                                </Route> 
                                
                            <Route exact path='/Priority'>
                            {this.state.PriorityConfigcom ?  <NotFound/>:
                                <PriorityConfigcom/>}
                            </Route>


                            <Route exact path='/Severity'>
                            {this.state.SeverityConfigcom ? <NotFound/>:
                                <SeverityConfigcom/>}
                            </Route>
                            

                            <Route exact path='/Status'>
                            {this.state.DefectStatusConfigcom ? <NotFound/>:
                                <DefectStatusConfigcom/>}
                            </Route>

                            {/* Company Route*/}
                           
                            <Route exact path='/project'>
                            {this.state.ManageProject ? <NotFound/>:
                                <ProjectComponent/>}
                                </Route> 
                            
                            {/* HR Allocation Route*/}
                           
                            <Route path='/company/hrallocation'>
                            {this.state.HRAllocation ? <NotFound/>:
                                <HRAllocationComponent/>}
                            </Route>

                            {/* Employee Route*/}
                          
                            <Route path='/company/employee'>
                            {this.state.ManageCompany ? <NotFound/>:
                                <EmployeeComponent/>}
                            </Route>

                            {/* Module Route*/}
                           
                            <Route path='/module'>
                            {this.state.ManageModule ?  <NotFound/>:
                                <ModuleComponent/>
                            }
                            </Route>

                            {/* Module Route*/}
                           
                            <Route path='/projectallocation'>
                            {this.state.ProjectAllocation ?  <NotFound/>:
                                <ProjectManageAllocation/>}
                            </Route>

                                {/* General configuration -----------------------------------*/}
                                {/* Setting -> General configuration -> Priority Route*/}
                               
                                <Route path='/config/priority'>
                                {this.state.PriorityConfig ? <NotFound/>:
                                    <PriorityConfig/>}
                                </Route>

                                {/* Setting -> General configuration -> Severity Route*/}
                               
                                <Route path='/config/severity'>
                                {this.state.SeverityConfig ?  <NotFound/>:
                                    <SeverityConfig/>}
                                </Route>

                                {/* Setting -> General configuration -> Project type Route*/}

                                <Route path='/config/projecttypeconfig'>
                                {this.state.ProjectTypeConfig ?  <NotFound/>:
                                    <ProjectTypeConfig/>}
                                </Route>

                                {/* Setting -> General configuration -> Project status Route*/}

                                <Route path='/config/projectstatusconfig'>
                                {this.state.ProjectStatusConfig ?  <NotFound/>:
                                    <ProjectStatusConfig/>}
                                </Route>

                                {/* Setting -> General configuration -> Employee Role Route*/}

                                <Route path='/config/employeeroleconfig'>
                                {this.state.EmployeeRoleConfig ?  <NotFound/>:
                                    <EmployeeRole/>}
                                </Route>

                                {/* Setting -> General configuration -> Defect Release Route*/}

                                <Route path='/config/defectreleaseconfig'>
                                {this.state.DefectReleaseConfig ?  <NotFound/>:
                                    <DefectRelease/>}
                                </Route>

                                {/* Setting -> General configuration -> Employee Designation Route*/}

                                <Route path='/config/designationconfig'>
                                {this.state.DesignationConfig ?  <NotFound/>:
                                    <DesignationConfig/>}
                                </Route>

                                {/* Setting -> General configuration -> Defect type Route*/}
                               
                                <Route path='/config/defecttype'>
                                {this.state.DefectTypeConfig ?   <NotFound/>:
                                    <DefectTypeConfig/>}
                                </Route>

                                {/* Setting -> General configuration -> Defect status Route*/}
                                
                                <Route path='/config/defectstatus'>
                                {this.state.DefectStatusConfig ?  <NotFound/>:
                                    <DefectStatusConfig/>}
                                </Route>

                                {/* Additional Setting -----------------------------------*/}
                                {/* Setting -> General configuration -> Priority Route*/}
                               
                                <Route path='/settings/auditlog'>
                                {this.state.ManageAuditLog ?  <NotFound/>:
                                    <AuditLog/>}
                                </Route>

                                {/* Setting -> General configuration -> Severity Route*/}
                                
                                <Route path='/settings/lookandfeel'>
                                {this.state.LookAndFeel ?  <NotFound/>:
                                    <LookAndFeel/>}
                                </Route>

                                {/* Setting -> General configuration -> Defect type Route*/}
                               
                                <Route path='/settings/generalsetting'>
                                {this.state.Generalsetting ?  <NotFound/>:
                                    <GeneralSetting/>}
                                </Route>

                                {/* Setting -> General configuration -> Defect status Route*/}
                                
                                <Route path='/settings/profilescreen'>
                                {this.state.ProfileSetting ?  <NotFound/>:
                                    <ProfileScreen/>}
                                </Route>


                                {/* Privilege -----------------------------------*/}
                                {/* Setting -> Privilege -> Company Route*/}
                             
                                <Route path='/privilege/company'>
                                {this.state.CompanyPrivilege ? <NotFound/>:
                                    <CompanyPrivilege/>}
                                </Route>

                                {/* Setting -> Privilege -> Project Route*/}
                               
                                <Route path='/privilege/project'>
                                {this.state.ProjectPrivilege ? <NotFound/>:
                                    <ProjectPrivilege/>}
                                </Route>

                                {/* Setting -> Privilege -> QA Lead Route*/}
                             
                                <Route path='/privilege/qalead'>
                                {this.state.QAPrivilege ?  <NotFound/>:
                                    <QAPrivilege/>}
                                </Route>

                                 {/* Setting -> Privilege -> HR Route*/}
                                
                                 <Route path='/privilege/hr'> 
                                 {this.state.HRPrivilege ?  <NotFound/>:
                                    <HRPrivilege/>}
                                </Route>

                                  {/* Setting -> Privilege -> Developer Route*/}
                                
                                  <Route path='/privilege/developer'>
                                  {this.state.DeveloperPrivilege ?  <NotFound/>:
                                    <DevelpoerPrivilege/>}
                                </Route>

                                  {/* Setting -> Privilege -> PM Route*/}
                                  
                                  <Route path='/privilege/pm'>
                                  {this.state.PMPrivilege ? <NotFound/>:
                                    <ProjectManagerPrivilege/>}
                                </Route>

                                {/* Setting -> Privilege -> Tech Lead Route*/}
                               
                                <Route path='/privilege/techlead'>
                                {this.state.TecLeadPrivilege ? <NotFound/>:
                                    <TechLeadPrivilege/>}
                                </Route>

                                 <Route path='/privilege/projectConfig'>
                                {this.state.ProjectConfigurePrivilege ? <NotFound/>:
                                    <ProjectConfigurePrivilege/>}
                                </Route>

                                {/* Work Flow -----------------------------------*/}
                                {/* Setting -> Workflow -> DefectStatusFlow Route*/}
                               
                                <Route path='/workflow/defectstatus'>
                                {this.state.DefectStatusFlow ?  <NotFound/>:
                                    <DefectStatusFlowComponent/>}
                                </Route>

                                {/* Setting -> Workflow -> DefectRolesFlow Route*/}
                              
                                <Route path='/workflow/defectroles'>
                                {this.state.DefectRolesFlow ?  <NotFound/>:
                                    <DefectRolesFlowComponent/>}
                                </Route>

                        </Switch>
                        
                    </Content>
                    <Footer
                        style={{
                        textAlign: 'center'
                    }}>
                        Defect Tracker ©2019 Created by Invicta Innovation
                    </Footer>
                </Layout>
            </Layout>
          
        );

    }
}

export default Dashboard;
