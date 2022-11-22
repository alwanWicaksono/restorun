import { ITEMS_FETCH_SUCCESS, ITEM_FETCH_SUCCESS } from "./actionType";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function itemsFetchSuccess(payload) {
  return {
    type: ITEMS_FETCH_SUCCESS,
    payload,
  };
}
function itemFetchSuccess(payload) {
  return {
    type: ITEM_FETCH_SUCCESS,
    payload,
  };
}

export function fetchItems() {
  return async (dispatch) => {
    try {
      const response = await fetch("https://taco-bell-2022.herokuapp.com/admin/items", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      if (!response.ok) throw new Error("Internal Server Error");
      const data = await response.json()
      dispatch(itemsFetchSuccess(data))
    } catch (error) {
      console.log(error);
    }
  };
}
export function fetchItem(itemId) {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://taco-bell-2022.herokuapp.com/admin/items/${itemId}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      if (!response.ok) throw new Error("Internal Server Error");
      const data = await response.json()
      dispatch(itemFetchSuccess(data))
    } catch (error) {
      console.log(error);
    }
  };
}
export function createItem(itemInput) {
  return async (dispatch) => {
    try {
      console.log("test");
      const response = await fetch("https://taco-bell-2022.herokuapp.com/admin/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(itemInput),
      })
      if (!response.ok) throw new Error({msg: "Internal Server Error"});
      MySwal.fire({
        icon: "success",
        title: "Add Item Success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchItems())
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: error.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
}
export function updateItem(itemInput, itemId) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://taco-bell-2022.herokuapp.com/admin/items/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify(itemInput),
        }
      )
      if (!response.ok) throw new Error({msg: "Internal Server Error"});
      MySwal.fire({
        icon: "success",
        title: "Edit Item Success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchItems())
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: error.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
  };
}
export function deleteItem(itemId) {
  return async (dispatch) => {
    try {
      await MySwal.fire({
        title: "Are you sure ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
      }).then((deleted) => {
        if (deleted.isConfirmed) {
          fetch(
            `https://taco-bell-2022.herokuapp.com/admin/items/${itemId}`,
            {
              method: "DELETE",
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            if (!response.ok) throw new Error("Internal Server Error");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Delete Item Success",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(fetchItems())
          })
          .catch((err) => {
            Swal.fire({
              icon: "warning",
              title: err.msg,
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: error.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
}