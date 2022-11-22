import { ITEM_DETAIL_SUCCESS, ITEM_FETCH_SUCCESS } from "./actionType";

function itemFetchSuccess(payload) {
  return {
    type: ITEM_FETCH_SUCCESS,
    payload
  };
}

export function fetchItem(url) {
  return async (dispatch) => {
    try {
      const response = await fetch(url)
      if(!response.ok) throw new Error("Internal Server Error");
      const item = await response.json()
      dispatch(itemFetchSuccess(item))
    } catch (error) {
      console.log(error);
    }
  }
}

function itemDetailSuccess(payload) {
  return {
    type: ITEM_DETAIL_SUCCESS,
    payload
  };
}

export function fetchDetailItem(url) {
  return async (dispatch) => {
    try {
      const response = await fetch(url)
      if(!response.ok) throw new Error("Internal Server Error");
      const item = await response.json()
      dispatch(itemDetailSuccess(item))
    } catch (error) {
      console.log(error);
    }
  }
}

