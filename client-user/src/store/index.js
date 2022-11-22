import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import itemReducer from "./reducers/itemReducer";

let store = createStore(itemReducer, applyMiddleware(thunk));

export default store;