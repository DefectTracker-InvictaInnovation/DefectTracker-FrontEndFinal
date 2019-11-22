import { api } from './axiosConfig';

const request = (options) => {
    const {method, service, endpoint, token, body, params} = options;
    
    return new Promise(
        function (resolve, reject) {
            
        api(method, service, endpoint, token, body, params)
            .then(response => {
                resolve(response.data);
            })
            .catch(errorMessage => {
                // the error has already been handled by handleError
                // the message get's passed here
                // do something like store it in redux, etc.
                console.log('ERROR: '+errorMessage);
                reject(errorMessage);
            });
        });
};

    export function getAllEmployees(parameter) {
        return request({
            method: 'GET',
            service: 'employee',
            endpoint: "/getallemployee",
            token: true,
            body: null,
            params: null
        });
    }
    //const parameter = {id: ''};
    export function deleteEmployee(parameter) {
        return request({
            method: 'DELETE',
            service: 'employee',
            endpoint: "/deletebyid",
            token: true,
            body: null,
            params: parameter
        });
    }

    export function fetchDesignations(parameter) {
        return request({
            method: 'GET',
            service: 'employee',
            endpoint: "/getAllDesignation",
            token: true,
            body: null,
            params: null
        });
    }
   