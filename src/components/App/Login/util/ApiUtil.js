import { API_BASE_URL,LOGIN_API_BASE_URL, ACCESS_TOKEN,API_BASE_URL_USER, API_BASE_URL_EMP } from './../../../../constants/index';
import axios from "axios";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        
        response.json().then(json => {
            
            if(!response.ok) {
                return Promise.reject(json);
            }
            console.log(json)
            return json;
        })
    );
};


export function login(loginRequest) {
    return request({
        url: LOGIN_API_BASE_URL + "/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
   
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url:  API_BASE_URL_EMP+"/getallemployee",
        method: 'GET'
    });
}

export function getCurrentAdmin() {
    return request({
        url: API_BASE_URL + "/user/ad",
        method: 'GET'
    });
    
}
export function getUserProfile(username) {
    return axios.get(LOGIN_API_BASE_URL+"/users/"+ username )
}

export function getcuruser(){
    let token=localStorage.getItem(ACCESS_TOKEN);
   return  axios.get(LOGIN_API_BASE_URL+"/user/me" ,
   { headers: {"Authorization" : `Bearer ${token}`} }) 
}

