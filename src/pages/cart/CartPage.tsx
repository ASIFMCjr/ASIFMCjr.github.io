import { CartCard, Modal } from 'entities/cart'
import React, { useEffect, useState } from 'react'
import { TypeWriter } from 'shared/ui/functions/typewriter'
import './index.sass'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { fetchCartList } from 'entities/cart/model/cartSlice'
import { Button } from 'shared/ui'
import { createPortal } from 'react-dom'

export const CartPage = () => {
	const dispatch = useAppDispatch()
	const cart = useAppSelector((state) => state.cart.cartList)
	useEffect(() => {
		dispatch(fetchCartList())
	}, [])
	const [showModal, setShowModal] = useState<boolean>(false)
	return (
		<div className="preCart">
			<div className="cart">
				<div className="cart-main cart-block">
					<div className="cart-main__heading">
						<h1>Cart</h1>
					</div>
					<div className="cart-main__items">
						{cart.products?.length ? (
							cart.products.map((cartEl) => {
								return <CartCard key={cartEl.id} cart={cartEl} />
							})
						) : (
							<TypeWriter text={'Cart is empty, try to add some books'} />
						)}
					</div>
				</div>
				<div className="cart-nav cart-block">
					<div className="cart-nav__price">
						<h2>Total</h2>
						<h2>{cart.total} p</h2>
					</div>
					<Button
						text="Make order"
						disabled={!cart.products.length}
						onClick={() => {
							console.log('здесь модалку и потом заказ')
							setShowModal(true)
						}}
						width={'100%'}
					/>
					{showModal &&
						createPortal(
							<Modal onClose={() => setShowModal(false)} />,
							document.body
						)}
				</div>
			</div>
		</div>
	)
}
