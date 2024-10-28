import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store.js';
import axios from "axios";

// Componente para buscar as ruas
const FetchRuas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRuas = async () => {
      try {
        const resposta = await axios.get("http://localhost:5000/api/ruas");
        dispatch({ type: "SET_RUAS", payload: resposta.data });
      } catch (erro) {
        if (erro.response != null)
          alert("Erro ao buscar ruas:  " + erro.response.data.mensagem);
        else
          alert("Erro ao buscar ruas: API Offline");
      }
    };
    fetchRuas();
  }, [dispatch]);

  return null; // Este componente não precisa renderizar nada
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FetchRuas /> {/* Chama o componente para buscar as ruas */}
      <App />
    </Provider>
  </React.StrictMode>
);
