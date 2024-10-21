import { createStore, combineReducers } from "redux";
import loginReducer from "./loginReducer"; // Importa o reducer
import ruaReducer from './ruaReducer'; // Importa o reducer das ruas

const reducerCombinado = combineReducers({
    ruas: ruaReducer,
    login: loginReducer
    // Outros reducers podem ser adicionados aqui
});

// Cria a store com o loginReducer e ruaReducer
const store = createStore(reducerCombinado);

export default store;