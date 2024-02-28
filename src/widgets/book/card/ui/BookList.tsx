import { BookItem, bookApi } from 'entities/book'
// import { Pagination } from 'entities/pagination'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.sass'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { fetchBooks } from 'entities/book/model/bookSlice'

export const Book = () => {
	const books = useAppSelector((state) => state.books.booksInfo)
	const loading = useAppSelector((state) => state.books.loading)
	const [val, setVal] = useState<string>('')
	const [dir, setDir] = useState<string>('')
	const dispatch = useAppDispatch()
	return (
		<div className="book_cards">
			<div className="book_cards-sort">
				<p>Sort</p>
				<select
					name="direction"
					id=""
					value={dir}
					onChange={(e) => {
						setDir(e.target.value)
						dispatch(fetchBooks({ ordering: `${e.target.value}${val}` }))
					}}
				>
					<option value="">ASCENDING</option>
					<option value="-">DESCENDING</option>
				</select>
				<select
					name="value"
					id=""
					value={val}
					onChange={(e) => {
						setVal(e.target.value)
						dispatch(fetchBooks({ ordering: `${dir}${e.target.value}` }))
					}}
				>
					<option value="id">default</option>
					<option value="in_stock">in stock</option>
					<option value="title">title</option>
					<option value="description">description</option>
					<option value="price">price</option>
					<option value="genres">genres</option>
					<option value="author">author</option>
					<option value="release_date">release date</option>
					<option value="writing_date">writing date</option>
				</select>
			</div>
			<div className="book_cards-elements">
				{!loading &&
					books?.result.map((book: bookApi.Book) => {
						return (
							<Link
								to={`${book.id}`}
								// state={{ book: book }}
								onClick={() =>
									scrollTo({ top: 0, left: 0, behavior: 'smooth' })
								}
								key={book.id}
							>
								<BookItem {...book} />
							</Link>
						)
					})}
			</div>
		</div>
	)
}
