import {
  ITEMS_FETCH_SUCCESS,
  ITEM_FETCH_SUCCESS,
} from "../actions/actionType";
const initialState = { items: [], item: {} };

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ITEMS_FETCH_SUCCESS:
      return { ...state, items: action.payload };
    case ITEM_FETCH_SUCCESS:
      return { ...state, item: action.payload };
    default:
      return state;
  }
}

export default itemReducer;