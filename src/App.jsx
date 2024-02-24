import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import Header from './components/Header';
import Footer from './components/Footer';
import ContactPage from './pages/contact';
import HomePage from './pages/home';
import RegisterPage from './pages/register';
import UserList from './pages/admin/user/user-list';
import ProductDetailPage from './pages/product-detail';
import Banner from './components/Banner';
import Carousel from './components/Carousel';

const Layout = () => {
  return(
    <div className='layout-app'>
      <Header/>
      <Banner/>
      {/* <Carousel/> */}
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <div>404 NOT FOUND</div>,
      children: [
        {
          index: true,
          element: <HomePage/>
        },
        {
          path: "contact",
          element: <ContactPage />
        },
        {
          path: "product/:id",
          element: <ProductDetailPage />
        },


      ]
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <div>404 NOT FOUND</div>
    },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <div>404 NOT FOUND</div>
    },
    {
      path: "/user-list",
      element: <UserList />,
      errorElement: <div>404 NOT FOUND</div>
    },
  ]);

 return (
  <div>
    <RouterProvider router={router} />
  </div>
 )
}
