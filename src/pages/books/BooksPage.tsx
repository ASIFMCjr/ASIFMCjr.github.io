import { fetchBooks } from 'entities/book/model/bookSlice'
import { fetchCartList } from 'entities/cart/model/cartSlice'
import { Pagination } from 'entities/pagination'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { BookCard } from 'widgets/book/card'
import { BookFilter } from 'widgets/book/filter'

export const BooksPage = () => {
	const dispatch = useAppDispatch()
	const books = useAppSelector((state) => state.books.booksInfo)
	useEffect(() => {
		console.log(books)
		if (!books.total_items) dispatch(fetchBooks())
		dispatch(fetchCartList())
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
				<BookFilter />
				<BookCard />
			</div>
			<Pagination pages={books?.total_pages} current_page={books?.page} />
		</div>
	)
}
