import { CartCard, cartApi } from 'entities/cart'
import React, { useEffect, useState } from 'react'

export const CartPage = () => {
  const [cart, setCart] = useState<cartApi.CartList>()
  useEffect(() => {
    const initLoad = async () => setCart(await cartApi.getCartList())
    initLoad()
  }, []) 
  const cartItems = cart?.products
  
  return (
    <div>
      {cartItems?.map(cartEl => {
        return (
          <CartCard key={cartEl.id} cart={cartEl}/>
        )
      })}
    </div>
  )
}

