import { ITEM_DETAIL_SUCCESS, ITEM_FETCH_SUCCESS } from "../actions/actionType";
const initialState = { item: [], detailItem: {} };

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ITEM_FETCH_SUCCESS:
      return { ...state, item: action.payload };
    case ITEM_DETAIL_SUCCESS:
      return { ...state, detailItem: action.payload };
    default:
      return state;
  }
}

export default itemReducer