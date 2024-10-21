import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa o Provider e a store
import { Provider } from 'react-redux';
import store from './reducers/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Envolve a aplicação com o Provider e passa a store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
