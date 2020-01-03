import axios from "axios";
import {API_BASE_URL_PRODUCT,ACCESS_TOKEN} from './../../../constants/index';

function AddPriorityApi(data) {
  axios
    .post(API_BASE_URL_PRODUCT+"/Priority", data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
    .then(res => {
      if (res.status === 200) {
        alert("Status Successfylly Added...!");
        console.log(res.data);
      }
    });
}

function UpdatePriorityApi(data) {
  return fetch(API_BASE_URL_PRODUCT+"/Priority",{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeletePriorityApi(priorityId) {
  fetch(API_BASE_URL_PRODUCT+"/Priority/" + priorityId, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}},{
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + priorityId);
}

export default { AddPriorityApi, UpdatePriorityApi, DeletePriorityApi };
