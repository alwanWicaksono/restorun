import HomePage from '../pages/HomePage';
import {createBrowserRouter} from "react-router-dom";
import DetailPage from '../pages/Detail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/:itemId",
    element: <DetailPage/>
  },
]);

export default router