import { authorApi } from 'entities/author'
import { bookApi, BookItem } from 'entities/book'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './index.sass'

export const AuthorInfo = () => {
	const [author, setAuthor] = useState<authorApi.Author>()
	const [books, setBooks] = useState<bookApi.Books>()
	const { authorId } = useParams()

	useEffect(() => {
		const initLoad = async () =>
			setAuthor(await authorApi.getAuthor(Number(authorId)))
		initLoad()
	}, [])
	useEffect(() => {
		if (author) {
			const bookLoad = async () =>
				setBooks(
					await bookApi.getBooks({
						author: `${author.first_name} ${author.second_name}`,
					})
				)
			bookLoad()
		}
	}, [author])
	console.log(books)
	return (
		<div className="authorsBook_cards-elements">
			{books?.total_items ? (
				books.result.map((book) => {
					return (
						<Link
							to={`/books/${book.id}`}
							// state={{ book: book }}
							onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
							key={book.id}
						>
							<BookItem {...book} />
						</Link>
					)
				})
			) : (
				<p>This author have no books</p>
			)}
		</div>
	)
}
