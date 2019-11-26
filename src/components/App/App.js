import React from 'react';
import { HashRouter, Route, Switch, Router, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard/index';
import './App.css';
import WrappedNormalLoginForm from './../App/Login/index';
import { Layout, notification } from 'antd';
import { getCurrentUser, login, getcuruser, getUserProfile } from './Login/util/ApiUtil';
import history from './Login/util/history';
import axios from "axios";
import PrivateRoute from './Login/util/PrivateRoute';
import DefectDashboard from './../DashboardComponent/DefectDashboard';
import { ACCESS_TOKEN } from '../../constants/index';
import { ROLE_NAME } from '../../constants/index';
import { IS_AUTHENTICATED } from '../../constants/index';
import Forgot from './Login/forgot'
import Reset from './Login/reset';



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      loggedin: false,
      path: "/",
    }
    this.loadCurrentUser = this.loadCurrentUser.bind(this);

    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    console.log("ffffffffffffffff")
    getCurrentUser()
      .then(response => {
        console.log("ffffffffffffffff" + response.data)
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false,
          status: true,

        });
      }).catch(error => {
        this.setState({

          isLoading: false
        });
      });
  }

  getuser = () => {
    console.log("fffffffffffffffffffffffffffffffffff");

    let token = localStorage.getItem(ACCESS_TOKEN);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
      'Access-Control-Allow-Origin': '*'
    });
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    // headers.append('Access-Control-Allow-Origin', '*');
    const defaults = { headers: headers };
    // const headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    console.log(token)
    axios.get("http://localhost:8762/employeeservice/employeeservice/getallemployee",
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
          mode: 'no-cors'
        }
      })
      .then(res => {

        console.log(res);

      });

  }

  componentDidMount() {
    console.log('authenticated: ' + this.state.isAuthenticated);
    this.getuser();
    this.loadCurrentUser();
    getCurrentUser();




    console.log(localStorage.getItem(IS_AUTHENTICATED))

    console.log(localStorage.getItem(ACCESS_TOKEN));

  }



  handleLogin() {

    notification.success({
      message: 'Defect Tracker',
      description: "You're successfully logged in.",

    });
    console.log("hhhhh" + localStorage.getItem(ACCESS_TOKEN))
    this.getuser();

    this.setState({
      loggedin: true
    })

    if (localStorage.getItem(IS_AUTHENTICATED)) {

      if (localStorage.getItem(ROLE_NAME) === 'ROLE_HR') {
        console.log("ROLE_ADMIN")
        history.push('/#/home');
        window.location.reload();
      } else if (localStorage.getItem(ROLE_NAME) === 'ROLE_QA') {
        history.push('/#/dashboard/defect');
        console.log("ROLE_QA")
        window.location.reload();
      }
      else if (localStorage.getItem(ROLE_NAME) === 'ROLE_PM') {
        history.push('/#/dashboard/projectmanager/');
        console.log("ROLE_PM")
        window.location.reload();
      }
      else if (localStorage.getItem(ROLE_NAME) === 'ROLE_DEVELOPER') {
        history.push('/#/dashboard/developer');
        console.log("ROLE_DEVELOPER")
        window.location.reload();
      }
      else if (localStorage.getItem(ROLE_NAME) === 'ROLE_PRODUCT_ADMIN') {
        history.push('/#/productadministration');
        console.log("ROLE_DEVELOPER")
        window.location.reload();
      }
      else if (localStorage.getItem(ROLE_NAME) === 'ROLE_ADMIN') {
        history.push('/#/home');
        console.log("ROLE_ADMIN")
        window.location.reload();
      }
    }
  }


  render() {
    const { loggedIn } = this.state;
    return (
      <div>


        <Switch>


          <Route exact path="/"
            render={(props) => <WrappedNormalLoginForm onLogin={this.handleLogin} {...props} />}>

          </Route>
          <Route exact path="/login"
            render={(props) => <WrappedNormalLoginForm onLogin={this.handleLogin} {...props} />}>

          </Route>
          <Route exact path="/forgot" render={props => <Forgot {...props} />} />
          <Route path="/Reset">
            <Reset />
          </Route>
          <Route path='/' component={Dashboard}/>

          {/* <PrivateRoute
            authenticated={this.state.isAuthenticated}
            path="/"
            component={Dashboard}
            currentUser={this.state.currentUser}
            handleLogout={this.handleLogout} >
          </PrivateRoute> */}



        </Switch>


      </div>
    )
  }
}

export default App;