import React from 'react'
import {
	createBrowserRouter,
	Route,
	RouterProvider,
	Routes,
} from 'react-router-dom'

import { AuthPage } from './auth/AuthPage'
import { AuthorsPage } from './authors/AuthorsPage'
import { BooksPage } from './books/BooksPage'
import { CartPage } from './cart/CartPage'
import { BookInfo } from 'widgets/book/info'
import { ErrorPage } from './error/ErrorPage'
import { AuthorInfo } from 'widgets/author/info'
import { MainPage } from './main/MainPage'

const Root = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/authors">
				<Route path=":authorId" element={<AuthorInfo />} />
				<Route path="" element={<AuthorsPage />} />
			</Route>
			<Route path="/auth" element={<AuthPage />} />
			<Route path="/cart" element={<CartPage />} />
			<Route path="/books">
				<Route path=":bookId" element={<BookInfo />} />
				<Route path="" element={<BooksPage />} />
			</Route>
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	)
}

const router = createBrowserRouter([{ path: '*', Component: Root }])

export const Routing = () => {
	return <RouterProvider router={router} />
}
