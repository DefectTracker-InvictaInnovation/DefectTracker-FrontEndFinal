import  {ACCESS_TOKEN,API_BASE_URL,ROLE_NAME} from '../constants/index';
import {notification} from 'antd';
import axios from "axios";

export function getQaPrivilegeByName(name){
    let token=localStorage.getItem(ACCESS_TOKEN);
   return new Promise(
    function (resolve, reject) {
         axios.get(API_BASE_URL+"/getprivilegeName/"+name ,
   { headers: {"Authorization" : `Bearer ${token}`} })
   .then(res=>{
       resolve(res.data)
   })  

    });
}

export function getAllPrivileges(){
    let token=localStorage.getItem(ACCESS_TOKEN);
    let role=localStorage.getItem(ROLE_NAME)

if(role=='ROLE_QA'){
   return new Promise(
    function (resolve, reject) {
         axios.get(API_BASE_URL+"/getAllQAPrivilegeInfo" ,
   { headers: {"Authorization" : `Bearer ${token}`} })
   .then(res=>{
       resolve(res.data)
   })  
    });
}else if(role=='ROLE_DEVELOPER'){
    return new Promise(
        function (resolve, reject) {
             axios.get(API_BASE_URL+"/getAllDeveloperPrivilegeInfo" ,
       { headers: {"Authorization" : `Bearer ${token}`} })
       .then(res=>{
           resolve(res.data)
       })  
        });
}else if(role=='ROLE_HR'){
    return new Promise(
        function (resolve, reject) {
             axios.get(API_BASE_URL+"/getAlHRPrivilegeInfo" ,
       { headers: {"Authorization" : `Bearer ${token}`} })
       .then(res=>{
           resolve(res.data)
       })  
        });

}else if(role=='ROLE_PM'){
    return new Promise(
        function (resolve, reject) {
             axios.get(API_BASE_URL+"/getAlPMPrivilegeInfo" ,
       { headers: {"Authorization" : `Bearer ${token}`} })
       .then(res=>{
           resolve(res.data)
       })  
        });

}else if(role=='ROLE_ADMIN'){
    return new Promise(
        function (resolve, reject) {
             axios.get(API_BASE_URL+"/getAllProjectPrivilegeInfo" ,
       { headers: {"Authorization" : `Bearer ${token}`} })
       .then(res=>{
           console.log(res.data)
           resolve(res.data)
       })  
        });

}
}

export function getAllQaPrivilege(){
    const QaPrivileges=["AddDefect","EditDefect","ManageDefect","DefectDashboard","AddModule","DeleteDefect","EditModule","ManageModule","AddSubModule","EditSubModule","ManageSubModule","QADashboard","QAPrivilage"];

    return QaPrivileges;
}
let st ="";
export function getDeveloper(){
    
    axios.get("http://localhost:8762/defectservices/defectservices/getAllDeveloperPrivilegeInfo",{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
    .then(res=>{
         res.data.map(post=>{
                if("ManageCompany"==post.privilegeName){
                    console.log(post.status)
                    st=post.status
                    // if(post.status){
                    //     st.push("true");
                    // }else{
                    //     st.push("false");
                    // }

                    
                }
             })
    //    console.log(res.data)
    //    this.setState({st})
    })
        // console.log(res.data)
return st;
    // console.log(this.state.st)
}

export function notificationmsg(type,msg) {
    //  alert( msg)
    notification[type]({
      message: 'Notification Title',
      description:
        `Can't ${msg}`,
    });
  };

