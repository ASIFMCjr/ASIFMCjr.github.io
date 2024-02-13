import { CartCard } from 'entities/cart'
import React, { useEffect } from 'react'
import { TypeWriter } from 'shared/ui/functions/typewriter'
import './index.sass'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { fetchCartList } from 'entities/cart/model/slice'

export const CartPage = () => {
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector((state) => state.cart.cartList.products)

	useEffect(() => {
		dispatch(fetchCartList())
	}, [])
	return (
		<div>
			{cartItems?.length ? (
				<div className="cart">
					<div className="cart-main">
						<div className="cart-main__heading">
							<h1>Cart</h1>
						</div>
						<div className="cart-main__items">
							{cartItems.map((cartEl) => {
								return <CartCard key={cartEl.id} cart={cartEl} />
							})}
						</div>
					</div>
					<div className="cart-nav">
						<div className="cart-nav__price">
							<h2>Total p</h2>
						</div>
					</div>
				</div>
			) : (
				<TypeWriter text={'Cart is empty, try to add some books'} />
			)}
		</div>
	)
}
