import { legacy_createStore as createStore, combineReducers } from "redux";
import reduxLogin from "./redux.login";
import reduxRua from './redux.rua';

const repositorio = combineReducers({
    ruas: reduxRua,
    login: reduxLogin
});

// Cria a store com o loginReducer e ruaReducer
const store = createStore(repositorio);

export default store;