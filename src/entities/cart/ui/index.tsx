import React from 'react'
import { CartItem } from '../api'

export const CartCard: React.FC<{key: number, cart: CartItem}> = ({cart, key}) => {
  return (
    <div key={key}>
        <p>{cart.book_id} {cart.amount}</p>
    </div>
  )
}
