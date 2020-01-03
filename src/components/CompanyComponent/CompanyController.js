import axios from "axios";
import {API_BASE_URL_PRODUCT,ACCESS_TOKEN} from './../../constants/index';

function AddCompanyApi(data) {
  axios.post(API_BASE_URL_PRODUCT+"/Company", data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then(res => {
    if (res.status === 200) {
      alert("Company Successfylly Added...!");
      console.log(res.data);
    }
  });
}

function UpdateCompanyApi(data) {
  return fetch(API_BASE_URL_PRODUCT+"/Company", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}},{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeleteCompanyApi(companyId) {
  fetch(API_BASE_URL_PRODUCT+"/Company/" + companyId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + companyId);
}

export default { AddCompanyApi, UpdateCompanyApi, DeleteCompanyApi };
