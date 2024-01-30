import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./layout.jsx";

import {
  Home,
  Product,
  Contact,
  Services,
  SignUp,
  SignIn,
} from "./pages/page.js";

import { ProductPreview, Protected } from "./components/index.js";
import { UserProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="product/" element={<Product />}>
          <Route path="c/:categoryId" />
        </Route>
        <Route path="product/p/:productId" element={<ProductPreview />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
      </Route>
      <Route
        path="sign-up"
        element={
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        }
      />
      <Route
        path="sign-in"
        element={
          <Protected authentication={false}>
            <SignIn />
          </Protected>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
