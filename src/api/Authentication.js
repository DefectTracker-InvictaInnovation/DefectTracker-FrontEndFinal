import axios from 'axios';
import {loginUser, userAuthenticationSuccess, userAuthenticationError} from '../actions/index';
import { LOGIN_API_BASE_URL} from '../constants/index';
function userLogin(loginCredential) {
    return(dispatch) => {
       // dispatch(fetchProductsPending());
   console.log(loginCredential.username);
        axios.get(LOGIN_API_BASE_URL+"/getByUserMail/"+ loginCredential.username).then(function (res) {
            console.log(res);
            
            dispatch(userAuthenticationSuccess(res.data));
            return res;
        })
        .catch(function (error) {
            // handle error
            dispatch(userAuthenticationError(error));
            console.log(error);
        });
       // .finally(function () {
            // always executed
        //});
           
       
    }
    
}

export default userLogin;