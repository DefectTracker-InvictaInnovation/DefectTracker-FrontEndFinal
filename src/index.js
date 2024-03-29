import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import { Router } from 'react-router-dom'
import {Provider} from 'react-redux';
import App from './components/App/App';
//import Apps from './components/App/Dashboard/index';
import 'antd/dist/antd.css'; 
import * as serviceWorker from './serviceWorker';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';
import history from "./components/App/Login/util/history";

// Declare Storage for Application
const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router  history={history}>
            <App />
        </Router>
        {/* <HashRouter>
            <Apps />
        </HashRouter> */}
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();