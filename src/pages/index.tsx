import React from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import { AuthPage }    from './auth'
import { MainPage }    from './main'
import { AuthorsPage } from './authors'
import { BooksPage }   from './books'
import { CartPage }    from './cart'

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/books" element={<BooksPage />} />
    </Routes>
  );
}

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

export const Routing = () => {
  return <RouterProvider router={router} />;
}
