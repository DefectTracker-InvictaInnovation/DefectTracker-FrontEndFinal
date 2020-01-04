import axios from 'axios';
import {ACCESS_TOKEN,API_BASE_URL,LOGIN_API_BASE_URL,EMP_API_BASE_URL,PRODUCT_API_BASE_URL} from '../constants/index'
import handleError from './handleError';

function addParamsToURL(url, params) {
    if (params) {
        let temp = url;
        temp = temp+'/'+params;
        return temp;
    }
    return url;
}

function getService (service) {
    switch(service){
        case 'defect':
            return API_BASE_URL;
        case 'login':
            return LOGIN_API_BASE_URL;
        case 'employee':
            return EMP_API_BASE_URL;
        case 'product':
            return PRODUCT_API_BASE_URL;
        default:
            console.log('ERROR: Please specify a service !');
    }
}

const getHeaders = (token) => {
    if(token){
        return {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
            'Access-Control-Allow-Origin': '*',
            },
        };
    }else{
        return {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        };
    }
};


export const api = (method, service, endpoint, token, body, params) => {
    switch(method){
        case 'GET':
            // HTTP GET Request - Returns Resolved or Rejected Promise
            return new Promise((resolve, reject) => {
                console.log('workkk');
                const SERVICE = getService(service);
                const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
                axios.get(URL, getHeaders(token))
                .then(response => { resolve(response) })
                .catch(error => { reject(handleError(error)) });
            });
        case 'POST':
            // HTTP POST Request - Returns Resolved or Rejected Promise
                return new Promise((resolve, reject) => {
                const SERVICE = getService(service);
                const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
                axios.post(URL, body, getHeaders(token))
                    .then(response => { resolve(response) })
                    .catch(error => { reject(handleError(error)) });
                });
        case 'DELETE': 
            // HTTP DELETE Request - Returns Resolved or Rejected Promise
                return new Promise((resolve, reject) => {
                const SERVICE = getService(service);
                const URL = addParamsToURL(`${SERVICE}${endpoint}`, params);
                axios.delete(URL, getHeaders(token))
                    .then(response => { resolve(response) })
                    .catch(error => { reject(handleError(error)) });
                });
    }
};


