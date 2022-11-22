import { CATEGORIES_FETCH_SUCCESS, CATEGORY_FETCH_SUCCESS } from "./actionType";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function CategoriesFetchSuccess(payload) {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    payload,
  };
}
function CategoryFetchSuccess(payload) {
  return {
    type: CATEGORY_FETCH_SUCCESS,
    payload,
  };
}

export function fetchCategories() {
  return async (dispatch) => {
    try {
      const response = await fetch("https://taco-bell-2022.herokuapp.com/admin/categories", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        }
      })
      if (!response.ok) throw new Error("Internal Server Error");
      const data = await response.json();
      dispatch(CategoriesFetchSuccess(data))
    } catch (error) {
      console.log(error);
    }
  };
}
export function fetchCategory(categoryId) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://taco-bell-2022.herokuapp.com/admin/categories/${categoryId}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      if (!response.ok) throw new Error("Internal Server Error")
      const data = await response.json()
      dispatch(CategoryFetchSuccess(data))
    } catch (error) {
      console.log(error)
    }
  };
}

export function createCategory(name) {
  return async (dispatch) => {
    try {
      const response = await fetch("https://taco-bell-2022.herokuapp.com/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ name }),
      })
      if (!response.ok) throw new Error("Internal Server Error");
      MySwal.fire({
        icon: "success",
        title: "Add Category Success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchCategories())
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
export function updateCategory(name, categoryId) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://taco-bell-2022.herokuapp.com/admin/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify({ name }),
        }
      )
      if (!response.ok) throw new Error({msg: "Internal Server Error"})
      MySwal.fire({
        icon: "success",
        title: "Edit Category Success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchCategories())
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
export function deleteCategory(categoryId) {
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
            `https://taco-bell-2022.herokuapp.com/admin/categories/${categoryId}`,
            {
              method: "DELETE",
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            }
          )
          .then((response) => {
            if (!response.ok) throw new Error({msg: "Internal Server Error"});
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Delete Category Success",
              showConfirmButton: false,
              timer: 1500,
            });
            dispatch(fetchCategories())
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
