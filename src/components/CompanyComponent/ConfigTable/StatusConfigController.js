import axios from "axios";
import {API_BASE_URL_PRODUCT,ACCESS_TOKEN} from './../../../constants/index';

function AddStatusApi(data) {
  axios.post(API_BASE_URL_PRODUCT+"/Status", data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then(res => {
    if (res.status === 200) {
      alert("Status Successfylly Added...!");
      console.log(res.data);
    }
  });
}

function UpdateStatusApi(data) {
  return fetch(API_BASE_URL_PRODUCT+"/Status",{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeleteStatusApi(stausId) {
  fetch(API_BASE_URL_PRODUCT+"/Status/" + stausId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + stausId);
}

export default { AddStatusApi, UpdateStatusApi, DeleteStatusApi };
