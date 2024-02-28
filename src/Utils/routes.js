import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const ErrorPage = lazy(() => import("../components/common/errorPage"));
const Container = lazy(() => import("../components/app-container/container"));
const Header = lazy(() => import("../components/common/header"));
const Home = lazy(() => import("../components/routes/home"));
const Browse = lazy(() => import("../components/routes/browse"));
const Genre = lazy(() => import("../components/routes/genre"));
const MyList = lazy(() => import("../components/routes/my-list"));
const Search = lazy(() => import("../components/routes/search-page"));
const Signup = lazy(() => import("../components/routes/signup"));
const Login = lazy(() => import("../components/routes/login"));
const ExploreGenre = lazy(() => import("../components/routes/explore-genre"));
const CreateProfile = lazy(() => import("../components/routes/create-profile"));
const UpdateProfile = lazy(() => import("../components/routes/update-profile"));
const SelectProfile = lazy(() => import("../components/routes/select-profile"));
const AddProfile = lazy(() => import("../components/routes/add-profile"));
const ChooseAvatar = lazy(() => import("../components/routes/chooseAvatar"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
        <Container />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/create-profile",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <CreateProfile />
          </Suspense>
        ),
      },
      {
        path: "/add-profile",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <AddProfile />
          </Suspense>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <UpdateProfile />
          </Suspense>
        ),
      },
      {
        path: "/select-profile",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <SelectProfile />
          </Suspense>
        ),
      },
      {
        path: "/choose-avatar",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <ChooseAvatar />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <Header />
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/browse/:id",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <Header />
            <Browse />
          </Suspense>
        ),
      },
      {
        path: "/genre",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <Header />
            <Genre />
          </Suspense>
        ),
      },
      {
        path: "/explore/genre/:id",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <Header />
            <ExploreGenre />
          </Suspense>
        ),
      },
      {
        path: "/mylist",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <Header />
            <MyList />
          </Suspense>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <Header />
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<div id="loader" className="nfLoader"></div>}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
