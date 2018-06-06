import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactModal from "react-modal";

import './styles/index.css';
import store from './configureStore';
import registerServiceWorker from './registerServiceWorker';

import router from "./Router/router";

ReactModal.setAppElement('#root');

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>, document.getElementById('root'));
registerServiceWorker();
