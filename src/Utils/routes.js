import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components/common/errorPage";
import { Container } from "../components/app-container/container";
import Browse from "../components/routes/browse";
import ExploreGenre from "../components/routes/explore-genre";
import Search from "../components/routes/search-page";
import Signup from "../components/routes/signup";
import { Header } from "../components/common/header";
import ChooseAvatar from "../components/routes/chooseAvatar";

const Home = lazy(() => import("../components/routes/home"));
const Genre = lazy(() => import("../components/routes/genre"));
const MyList = lazy(() => import("../components/routes/my-list"));
const Login = lazy(() => import("../components/routes/login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/update-avatar",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ChooseAvatar />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/browse/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Browse />
          </Suspense>
        ),
      },
      {
        path: "/genre",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Genre />
          </Suspense>
        ),
      },
      {
        path: "/explore/genre/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <ExploreGenre />
          </Suspense>
        ),
      },
      {
        path: "/mylist",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <MyList />
          </Suspense>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
