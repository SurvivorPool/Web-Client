import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import store from './configureStore';
import registerServiceWorker from './registerServiceWorker';

import router from "./Router/router";

ReactDOM.render(
    <Provider store={store}>
        <div className={"App"}>
            {router}
        </div>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
