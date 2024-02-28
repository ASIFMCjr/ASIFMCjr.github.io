import { fetchBooks } from 'entities/book/model/bookSlice'
import { fetchCartList } from 'entities/cart/model/cartSlice'
import { fetchFavorites } from 'entities/favorites/model/favoritesSlice'
import { fetchOrders } from 'entities/order/model/orderSlice'
import { Pagination } from 'entities/pagination'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { BookCard } from 'widgets/book/card'
import { BookFilter } from 'widgets/book/filter'
import './index.sass'

export const BooksPage = () => {
	const dispatch = useAppDispatch()
	const books = useAppSelector((state) => state.books.booksInfo)
	useEffect(() => {
		if (!books.total_items) dispatch(fetchBooks())
		dispatch(fetchCartList())
		dispatch(fetchFavorites({}))
		dispatch(fetchOrders())
	}, [])

	return (
		<div>
			<div
				style={{
					margin: 'auto',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<div className="books-filter">
					<BookFilter />
				</div>
				<BookCard />
			</div>
			<Pagination
				type="book"
				pages={books?.total_pages}
				current_page={books?.page}
			/>
		</div>
	)
}
