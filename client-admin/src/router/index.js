import Layout from '../pages/Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Login';
import CategoryPage from '../pages/CategoryPage'
import {createBrowserRouter} from "react-router-dom";
import { redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/");
      }
    }
  },
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/categories",
        element: <CategoryPage/>
      }
    ],
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      }
    }
  }
]);

export default router