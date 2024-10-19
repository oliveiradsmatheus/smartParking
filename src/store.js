import { createStore } from "redux";
import loginReducer from "./reducers/loginReducer"; // Importa o reducer

// Cria a store com o loginReducer
const store = createStore(loginReducer);

export default store;
