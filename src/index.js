import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducer from './store/reducer/auth';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <App></App>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
