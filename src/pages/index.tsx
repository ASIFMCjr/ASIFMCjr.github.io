import React, { useEffect } from 'react'
import {
	createBrowserRouter,
	Route,
	RouterProvider,
	Routes,
	Navigate,
} from 'react-router-dom'

import { AuthPage } from './auth/AuthPage'
import { AuthorsPage } from './authors/AuthorsPage'
import { BooksPage } from './books/BooksPage'
import { CartPage } from './cart/CartPage'
import { BookInfo } from 'widgets/book/info'
import { ErrorPage } from './error/ErrorPage'
import { AuthorInfo } from 'widgets/author/info'
import { MainPage } from './main/MainPage'
import { Header } from 'widgets/header'
import { Footer } from 'widgets/footer'
import './index.sass'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { setIsAuth } from 'features/auth/sign-up/model/slice'
import { revokeToken } from 'shared/api'

type Props = {
	Component: React.FC
}

const ProtectedAuthRoute: React.FC<Props> = ({ Component }) => {
	const user = useAppSelector((state) => state.user.user.is_auth)
	return user ? <Navigate to={'/books'} replace /> : <Component />
}

const ProtectedPrivateRoute: React.FC<Props> = ({ Component }) => {
	const user = useAppSelector((state) => state.user.user.is_auth)
	return !user ? <Navigate to={'/auth'} /> : <Component />
}

const Root = () => {
	return (
		<>
			<Header />
			<div className="screen">
				<Routes>
					<Route
						path="/"
						element={<ProtectedPrivateRoute Component={MainPage} />}
					/>
					<Route path="/authors">
						<Route
							path=":authorId"
							element={<ProtectedPrivateRoute Component={AuthorInfo} />}
						/>
						<Route
							path=""
							element={<ProtectedPrivateRoute Component={AuthorsPage} />}
						/>
					</Route>
					<Route
						path="/auth"
						element={<ProtectedAuthRoute Component={AuthPage} />}
					/>
					<Route
						path="/cart"
						element={<ProtectedPrivateRoute Component={CartPage} />}
					/>
					<Route path="/books">
						<Route
							path=":bookId"
							element={<ProtectedPrivateRoute Component={BookInfo} />}
						/>
						<Route
							path=""
							element={<ProtectedPrivateRoute Component={BooksPage} />}
						/>
					</Route>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
			<Footer />
		</>
	)
}

const router = createBrowserRouter([{ path: '*', Component: Root }])

export const Routing = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		const initLoad = async () =>
			localStorage.getItem('access')
				? dispatch(setIsAuth(true))
				: (await revokeToken())
					? dispatch(setIsAuth(true))
					: undefined
		initLoad()
	}, [])
	return <RouterProvider router={router} />
}
