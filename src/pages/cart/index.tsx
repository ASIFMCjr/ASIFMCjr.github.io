import { CartCard, cartApi } from 'entities/cart'
import React, { useEffect, useState } from 'react'
import { TypeWriter } from 'shared/ui/functions/typewriter'

export const CartPage = () => {
	const [cart, setCart] = useState<cartApi.CartList>()
	useEffect(() => {
		const initLoad = async () => setCart(await cartApi.getCartList())
		initLoad()
	}, [])
	const cartItems = cart?.products

	return (
		<div>
			{cartItems?.length ? (
				cartItems.map((cartEl) => {
					return <CartCard key={cartEl.id} cart={cartEl} />
				})
			) : (
				<TypeWriter text={'Cart is empty, try to add some books'} />
			)}
		</div>
	)
}

// ебашить промис ол
