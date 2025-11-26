import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Layout from './Client/pages/Layout';
import Signup from './Client/pages/Signup';
import Login from './Client/pages/Login';
import Contextt from './Client/Context.jsx/Contextt';
import Home from './Client/pages/Home';
import AboutPage from './Client/pages/AboutPage';
import ProtectedRoute from './Client/pages/ProtectedRoute';
import CreateBlog from './Client/pages/CreateBlog';
import BlogDetail from './Client/pages/BlogDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Client/pages/Update';
import UserBlog from './Client/pages/UserBlog';
import ScrollToTop from './Client/Components/ScrollToTop';

let routes = createBrowserRouter([
  {
    path: '/',
    element: <Contextt><Layout /><ScrollToTop/></Contextt>,
    children: [
      {
        path: '',
        element: <Signup />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'create/:category',
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        )
      },
      {
        path: 'detail/:id',
        element: (
          <ProtectedRoute>
            <BlogDetail />
          </ProtectedRoute>
        )
      },
      {
        path: 'update/:id',
        element: (
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        )
      },{
        path:'user',
        element:<ProtectedRoute><UserBlog/></ProtectedRoute>
      }
    ]
  }
])


const App = () => {
  return (
    <div>
        <ToastContainer />
 <RouterProvider router={routes} />
    </div>
  )
}

export default App
