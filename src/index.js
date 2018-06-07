import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactModal from "react-modal";

import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './configureStore';

import router from "./Router/router";
import Analytics from "./Common/Analytics/Analytics";

Analytics.initLibraries();

ReactModal.setAppElement('#root');

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>, document.getElementById('root'));
registerServiceWorker();
