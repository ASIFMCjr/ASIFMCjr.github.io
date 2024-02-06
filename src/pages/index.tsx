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
import { BookInfo } from "widgets/book/info";
import { ErrorPage } from "./error";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/books" >
        <Route path=":bookId" element={<BookInfo />} />
        <Route path="" element={<BooksPage />} />
      </Route>  
      <Route path='*' element={<ErrorPage />}/>
    </Routes>
  );
}

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

export const Routing = () => {
  return <RouterProvider router={router} />;
}
