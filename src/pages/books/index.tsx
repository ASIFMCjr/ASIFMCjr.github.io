import { fetchBooks } from 'entities/book'
import { fetchCartList } from 'entities/cart/model/slice'
import React, { useEffect } from 'react'
import { useAppDispatch } from 'shared/model/hooks'
import { BookCard } from 'widgets/book/card'

export const BooksPage = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchBooks())
		dispatch(fetchCartList())
	}, [])

	return (
		<div style={{ margin: 'auto' }}>
			<BookCard />
		</div>
	)
}
