import React, { Component } from 'react';
 import { Avatar, Tabs,Row,Col,} from 'antd';
 import UserIcon from '../../SettingComponent/images/user.png';
 import { getAvatarColor } from './Colors';
import './Profile.css';
import axios from "axios";
import {getUserProfile} from '../Login/util/ApiUtil';
import { LOGIN_API_BASE_URL,ACCESS_TOKEN } from '../../../constants';
const TabPane = Tabs.TabPane;


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        

        axios.get(LOGIN_API_BASE_URL+"/users/"+ username,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
        .then(response => {
            console.log(response.data)
            this.setState({
                user: response.data,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });      
        console.log(this.state.user)  
     }
      
    componentDidMount() {
        const username = this.props.match.params.username;
        console.log("sdddddddddddddddd"+username)
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
            { 
                this.state.user ? (
                    <div className="user-profile">
                        <div className="user-details" 
                        style={{
                            marginbottom: "44px",
                            paddingtop: "40px",
                            paddingbottom: "20px",
                            margin: "auto" ,
                            textalign: "center",
                         } }
                        >
                            <div className="user-avatar">
                          
                                <Avatar className="user-avatar-circle"   
                                style={{ backgroundColor: getAvatarColor(this.state.user.name), lineheight: "120px",fontsize: "40px", left: 0 ,width: "120px",
                                            height: "120px",
                                            borderradius: "60px",
                                            lineheight:"60px" 
                                        }}>
                                     {this.state.user.name[0].toUpperCase()}
                                </Avatar>
                            </div>
                            <div className="user-summary">
                            <br/>
                                <div className="full-name" style={{width:"180px"}}>
                                {this.state.user.name}
                                </div>
                               
                                <div className="username">
                                    
                                    </div>
                                <div className="user-joined">
                                </div>
                            </div>
                        </div>
                        
                        <div
                style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}> 
                    
                {/* profile image area */}
                <Row gutter={10}>
                    <Col span={4}>
                        <img src={UserIcon} alt="sorry no img" style={{ height: "10em" }} />
                    </Col>
                   
                </Row>
                <Row gutter={10}>
                    <Col span={12}>
                        <h2>Basic Information</h2>
                        <br />

                        {/* basic information form */}
                        <form action="" style={{ width: "25em" }}>
                            <label style={{ color: 'blue' }}>User Name :- </label>
                            <lable>  {this.state.user.username} </lable>
                            <br /><br />
                            <label style={{ color: 'blue' }}>First Name :- </label>
                            <label>{this.state.user.name}</label>
                            <br /><br />
                            <label style={{ color: 'blue' }}>Last Name :- </label>
                            <lable>  {this.state.user.lastname} </lable>
                            <br /><br />
                            <label style={{ color: 'blue' }}>Email :- </label>
                            <label > {this.state.user.email} </label>
                            <br /><br />  
                            <label style={{ color: 'blue' }}>Role :- </label>
                            <label>{this.state.user.role[0].name}</label>                        
                           
                        </form>
                       
                        
                        

                    </Col>
                    
                </Row>
                </div>  
                    </div> 
                ): null               
            }
        </div>
        );
    }
}

export default Profile;