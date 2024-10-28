import { legacy_createStore as createStore, combineReducers } from "redux";
import loginReducer from "./loginRedux"; // Importa o reducer de login
import ruaReducer from './ruaRedux'; // Importa o reducer das ruas

const reducerCombinado = combineReducers({
    ruas: ruaReducer,
    login: loginReducer
    // Outros reducers podem ser adicionados aqui
});

// Cria a store com o loginReducer e ruaReducer
const store = createStore(reducerCombinado);

export default store;