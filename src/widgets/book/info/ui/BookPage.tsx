import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from 'shared/ui'
import './index.sass'
import favorite from 'assets/favorite.svg'
import { favoritesApi } from 'entities/favorites'
import { Counter } from 'shared/ui/inputs/counter'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { fetchCartList, fetchUpdateCart } from 'entities/cart/model/cartSlice'

export const Book = () => {
	const dispatch = useAppDispatch()
	const { state } = useLocation()

	const { book } = state

	const [amount, setAmount] = useState<number>(0)

	const baseAmount = useAppSelector(
		(state) => state.cart.cartList
	).products.filter((item) => item.book_id === book?.id)[0]?.amount

	const initialRender = useRef<number>(0)

	const handleChange = async () =>
		dispatch(fetchUpdateCart({ book_id: book.id, amount: amount }))

	useEffect(() => {
		dispatch(fetchCartList())
	}, [])
	useEffect(() => {
		setAmount(baseAmount)
	}, [baseAmount])

	useEffect(() => {
		console.log(amount)
		if (initialRender.current === 3) handleChange()
		else initialRender.current += 1
	}, [amount])

	return (
		<div className="info" key={book?.id}>
			{book && (
				<>
					<div className="info-left">
						<h1>{book.title}</h1>
						<p>{book.description}</p>
					</div>
					<div className="info-right">
						<p>{book.price} р</p>
						<p>in stock {book.in_stock}</p>
						<div className="info-right__add">
							{amount ? (
								<Counter
									max={book.in_stock}
									amount={amount}
									setAmount={setAmount}
								/>
							) : (
								<Button
									text="Add to Cart"
									onClick={() => {
										setAmount(1)
									}}
								/>
							)}
							<img
								className="info-right__add_img"
								src={favorite}
								alt="add to favorite"
								onClick={() => favoritesApi.postFavorites(book.id)}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
