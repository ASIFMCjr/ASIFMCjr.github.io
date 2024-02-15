import React, { useEffect, useRef, useState } from 'react'
import { cartApi } from 'entities/cart'
import { bookApi } from 'entities/book'
import { Counter } from 'shared/ui/inputs/counter'
import './index.sass'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'shared/model/hooks'
import { fetchCartList, fetchUpdateCart } from 'entities/cart/model/cartSlice'

export const CartCard: React.FC<{ key?: number; cart: cartApi.CartItem }> = ({
	cart,
}) => {
	const dispatch = useAppDispatch()
	const [amount, setAmount] = useState<number>(cart.amount)
	const [book, setBook] = useState<bookApi.Book>()
	const initialRender = useRef<number>(0)

	const handleChange = async (am: number) => {
		await dispatch(fetchUpdateCart({ book_id: cart.book_id, amount: am }))
		dispatch(fetchCartList())
	}

	const handleAmount = (param: string, value?: number) => {
		switch (param) {
			case 'sub':
				setAmount((prev) => (0 < prev ? prev - 1 : 0))
				break
			case 'add':
				setAmount((prev) =>
					(book ? book.in_stock : 1) > prev ? (prev || 0) + 1 : prev
				)
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
		}
	}

	useEffect(() => {
		if (initialRender.current === 2) handleChange(amount)
		else initialRender.current += 1
	}, [amount])

	useEffect(() => {
		const initLoad = async () => setBook(await bookApi.getBook(cart.book_id))
		initLoad()
	}, [])

	return (
		<div className="cartItem">
			<Link to={`/books/${cart.book_id}`} state={{ book }}>
				<p>{book?.title}</p>
			</Link>
			<Counter
				max={book ? book.in_stock : 1}
				amount={amount}
				handleAmount={handleAmount}
			/>
		</div>
	)
}
