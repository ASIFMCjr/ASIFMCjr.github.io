import { BookItem, bookApi } from 'entities/book'
import { Pagination } from 'entities/pagination'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.sass'
import { useAppSelector } from 'shared/model/hooks'

export const Book = () => {
	// const [books, setBooks] = useState
	const books = useAppSelector((state) => state.books.booksInfo)

	return (
		<div className="book_cards">
			<div className="book_cards-elements">
				{books?.result.map((book: bookApi.Book) => {
					return (
						<Link
							to={`${book.id}`}
							state={{ book: book }}
							onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
							key={book.id}
						>
							<BookItem {...book} />
						</Link>
					)
				})}
			</div>

			<Pagination pages={books?.total_pages} current_page={books?.page} />
		</div>
	)
}
