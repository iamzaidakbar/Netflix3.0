import { createBrowserRouter } from "react-router-dom";
import { App } from "../../App";
import { ErrorPage } from "../components/common/errorPage";
import { Home } from "../components/routes/home";
import { Movies } from "../components/routes/movies";
import { MyList } from "../components/routes/my-list";
import { TvShows } from "../components/routes/tv-shows";
import { Container } from "../components/app-container/container";
import { Login } from '../components/routes/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "tvshows",
        element: <TvShows />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "mylist",
        element: <MyList />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
