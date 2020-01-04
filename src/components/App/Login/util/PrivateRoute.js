import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
  import {   IS_AUTHENTICATED } from '../../../../constants/index';
  
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(IS_AUTHENTICATED) ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.history.forward }
            }}
          />
        )
      }
    />
);
  
export default PrivateRoute