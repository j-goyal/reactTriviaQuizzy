// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Error from './components/Error';


const Results = () => {
  return <div>Results Page Content</div>; // You can customize this page
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'quiz/:quizid',
        element: <Quiz />,
      },
      {
        path: 'results',
        element: <Results />,
      },
    ],
  },
]);

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <h2></h2>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <RouterProvider router={router}>
      <div className="flex flex-col min-h-screen">
        <Outlet />
      </div>
    </RouterProvider>
  );
}

export default App;
