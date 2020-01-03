import axios from "axios";
import {API_BASE_URL_PRODUCT,ACCESS_TOKEN} from './../../../constants/index';

function AddTypeApi(data) {
  axios.post(API_BASE_URL_PRODUCT+"/Type", data,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}).then(res => {
    if (res.status === 200) {
      alert("Status Successfylly Added...!");
      console.log(res.data);
    }
  });
}

function UpdateTypeApi(data) {
  return fetch(API_BASE_URL_PRODUCT+"/Type", { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}},{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function DeleteTypeApi(typeId) {
  fetch(API_BASE_URL_PRODUCT+"/Type/" + typeId,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  });
  console.log("deleted: " + typeId);
}

export default { AddTypeApi, UpdateTypeApi, DeleteTypeApi };
