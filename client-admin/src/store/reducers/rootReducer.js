import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import itemReducer from "./itemReducer";


const rootReducer = combineReducers({
  item: itemReducer,
  category: categoryReducer,
});

export default rootReducer;