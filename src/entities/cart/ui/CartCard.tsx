import React, { useEffect, useState } from 'react'
import { cartApi } from 'entities/cart'
import { bookApi } from 'entities/book'
import { Counter } from 'shared/ui/inputs/counter'
import './index.sass'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'shared/model/hooks'
import { fetchCartList, fetchUpdateCart } from 'entities/cart/model/cartSlice'
import { authorApi } from 'entities/author'

export const CartCard: React.FC<{ key?: number; cart: cartApi.CartItem }> = ({
	cart,
}) => {
	const dispatch = useAppDispatch()
	const [amount, setAmount] = useState<number>(cart.amount)
	const [book, setBook] = useState<bookApi.Book>()
	// const initialRender = useRef<number>(0)
	const [authors, setAuthors] = useState<Array<authorApi.Author>>([])
	const [statusLoading, setStatusLoading] = useState<
		'pending' | 'fullfiled' | 'reject'
	>()
	const handleChange = async (am: number) => {
		setStatusLoading('pending')
		await dispatch(fetchUpdateCart({ book_id: cart.book_id, amount: am }))
		await dispatch(fetchCartList())
		setStatusLoading('fullfiled')
	}

	const handleAmount = (param: string, value?: number) => {
		switch (param) {
			case 'sub':
				setAmount((prev) => (0 < prev ? prev - 1 : 0))
				handleChange(amount > 0 ? amount - 1 : 0)
				break
			case 'add':
				setAmount((prev) =>
					(book ? book.in_stock : 1) > prev ? (prev || 0) + 1 : prev
				)
				handleChange(amount < (book ? book.in_stock : 1) ? amount + 1 : amount)
				break
			default:
				setAmount(
					value
						? value <= 0
							? 0
							: value >= (book ? book.in_stock : 1)
								? book
									? book.in_stock
									: 1
								: value
						: 0
				)
				handleChange(
					value
						? value <= 0
							? 0
							: value >= (book ? book.in_stock : 1)
								? book
									? book.in_stock
									: 1
								: value
						: 0
				)
		}
	}

	useEffect(() => {
		book?.author.every(async (i) => {
			const newAuthor = await authorApi.getAuthor(i)
			setAuthors((oldAuthors) =>
				!oldAuthors.includes(newAuthor)
					? [...oldAuthors, newAuthor]
					: [...oldAuthors]
			)
		})
	}, [book])

	useEffect(() => {
		const initLoad = async () => setBook(await bookApi.getBook(cart.book_id))
		initLoad()
	}, [])

	return (
		<div className="cartItem">
			<Link to={`/books/${cart.book_id}`} state={{ book }}>
				<p>{book?.title}</p>
				<p>{authors.map((author) => author.first_name)}</p>
			</Link>
			<Counter
				isDisabled={statusLoading === 'pending'}
				max={book ? book.in_stock : 1}
				amount={amount}
				handleAmount={handleAmount}
			/>
		</div>
	)
}
