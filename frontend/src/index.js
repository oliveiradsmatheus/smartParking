import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';
import store from './redux/redux.store';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <Toaster/>
        </Provider>
    </React.StrictMode>
);
