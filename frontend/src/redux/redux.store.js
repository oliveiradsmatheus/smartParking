import { legacy_createStore as createStore, combineReducers } from "redux";
import reduxLogin from "./redux.login"; // Importa o reducer de login
import reduxRua from './redux.rua'; // Importa o reducer das ruas

const repositorio = combineReducers({
    ruas: reduxRua,
    login: reduxLogin
    // Outros reducers podem ser adicionados aqui
});

// Cria a store com o loginReducer e ruaReducer
const store = createStore(repositorio);

export default store;