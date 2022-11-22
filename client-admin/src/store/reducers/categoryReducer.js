import { CATEGORIES_FETCH_SUCCESS, CATEGORY_FETCH_SUCCESS } from "../actions/actionType";
const initialState = { categories: [], category: {} };

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_FETCH_SUCCESS:
      return { ...state, categories: action.payload };
    case CATEGORY_FETCH_SUCCESS:
      return { ...state, category: action.payload };
    default:
      return state;
  }
}

export default categoryReducer;
