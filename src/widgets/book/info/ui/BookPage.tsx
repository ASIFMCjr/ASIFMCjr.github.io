import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'shared/ui'
import './index.sass'
// import { favoritesApi } from 'entities/favorites'
import { Counter } from 'shared/ui/inputs/counter'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { fetchCartList, fetchUpdateCart } from 'entities/cart/model/cartSlice'
import { bookApi } from 'entities/book'
import { authorApi } from 'entities/author'
import { formatDate } from 'shared/api'
// import { Like } from 'shared/ui/buttons/Like'
import { genresApi } from 'entities/genres'

export const Book = () => {
	const dispatch = useAppDispatch()

	const { bookId } = useParams()
	const [book, setBook] = useState<bookApi.Book>()

	const [amount, setAmount] = useState<number>(0)
	// const [liked, setLiked] = useState<boolean>(false)

	const [authors, setAuthors] = useState<Array<authorApi.Author>>([])
	const [genres, setGenres] = useState<Array<genresApi.Genre>>([])
	const [statusLoading, setStatusLoading] = useState<
		'pending' | 'fullfiled' | 'reject'
	>()

	const baseAmount = useAppSelector(
		(state) => state.cart.cartList
	).products.filter((item) => item.book_id === book?.id)[0]?.amount

	const initialRender = useRef<number>(0)

	const handleChange = async (am: number) => {
		if (!book) return
		setStatusLoading('pending')
		await dispatch(fetchUpdateCart({ book_id: book.id, amount: am }))
		setStatusLoading('fullfiled')
	}

	const handleAmount = (param: string, value?: number) => {
		if (!book) return
		switch (param) {
			case 'sub':
				if (amount <= 0) break
				setAmount(amount - 1)
				handleChange(amount - 1)
				break
			case 'add':
				if (amount >= book.in_stock) break
				setAmount(amount + 1)
				handleChange(amount + 1)
				break
			default:
				if (!value || value < 0) value = 0
				if (value > book.in_stock) value = book.in_stock
				setAmount(value)
				handleChange(value)
		}
	}
	useEffect(() => {
		const initLoad = async () => setBook(await bookApi.getBook(Number(bookId)))
		initLoad()
		initialRender.current++
	}, [])

	useEffect(() => {
		setAmount(baseAmount)
	}, [baseAmount])

	useEffect(() => {
		if (initialRender.current === 1) {
			book?.author.every(async (i) => {
				const newAuthor = await authorApi.getAuthor(i)
				setAuthors((oldAuthors) => [...oldAuthors, newAuthor])
			})
			book?.genres.every(async (i) => {
				const newGenre = await genresApi.getGenre(i)
				setGenres((oldGenres) => [...oldGenres, newGenre])
			})
			dispatch(fetchCartList())
		}
	}, [book])
	return (
		<div className="info" key={book?.id}>
			{book && (
				<div className="info-inner">
					<div className="info-both">
						<div className="info-left">
							<h1>{book.title}</h1>
							<p>{book.description}</p>
						</div>
						<div className="info-right">
							<div className="info-right__all">
								<p className="info-right__price">{book.price} р</p>
								<p className="info-right__strock">in stock {book.in_stock}</p>
								<div className="info-right__add">
									{amount ? (
										<Counter
											isDisabled={statusLoading === 'pending'}
											max={book.in_stock}
											amount={amount}
											handleAmount={handleAmount}
										/>
									) : (
										<Button
											text="Add to Cart"
											onClick={() => {
												setAmount(1)
												handleChange(1)
											}}
										/>
									)}
									{/* <Like
										liked={liked}
										onClick={async () => {
											try {
												await favoritesApi.postFavorites(book.id)
												setLiked((prev) => !prev)
											} catch (err) {
												console.log(err)
												alert('Item already in favorites')
											}
										}}
										className="info-right__add_img"
										size={40}
									/> */}
								</div>
							</div>
						</div>
					</div>

					<div className="info-other">
						<h2>Author:</h2>
						{authors.length ? (
							authors.map((author) => {
								return (
									<p key={author.id}>
										{author.first_name} {author.second_name}
									</p>
								)
							})
						) : (
							<p>No author</p>
						)}
						<h2>Genres:</h2>
						{genres.length
							? genres.map((genre) => {
									return <p key={genre.id}>{genre.title}</p>
								})
							: 'No author'}
						<h2>Writing date:</h2> <p>{formatDate(book.writing_date)}</p>
						<h2>Release date:</h2> <p>{formatDate(book.release_date)}</p>
					</div>
				</div>
			)}
		</div>
	)
}
