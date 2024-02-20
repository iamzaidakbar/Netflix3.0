import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../components/common/errorPage';
import { Container } from '../components/app-container/container';
import Browse from '../components/routes/browse';

const Home = lazy(() => import('../components/routes/home'));
const TvShows = lazy(() => import('../components/routes/tv-shows'));
const Movies = lazy(() => import('../components/routes/movies'));
const MyList = lazy(() => import('../components/routes/my-list'));
const Login = lazy(() => import('../components/routes/login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/browse/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
             <Browse />
          </Suspense>
        ),
      },
      {
        path: '/tvshows',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TvShows />
          </Suspense>
        ),
      },
      {
        path: '/movies',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: '/mylist',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MyList />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
