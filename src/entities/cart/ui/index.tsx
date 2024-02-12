import React, { useEffect, useRef, useState } from 'react'
import { cartApi } from 'entities/cart'
import { bookApi } from 'entities/book'
import { Counter } from 'shared/ui/inputs/counter'
import './index.sass'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'shared/model/hooks'
import { fetchUpdateCart } from 'entities/cart/model/slice'

export const CartCard: React.FC<{key?: number, cart: cartApi.CartItem}> = ({cart}) => {
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState<number>(cart.amount)
  const [book, setBook] = useState<bookApi.Book>()

  const initialRender = useRef<number>(0)

  const handleChange = async () => dispatch(fetchUpdateCart({book_id: cart.book_id, amount: amount}))

  useEffect(() => {
    console.log(amount)
    if (initialRender.current === 2) handleChange()
    else initialRender.current += 1
}, [amount])

  useEffect(() => {
    const initLoad = async() => setBook(await bookApi.getBook(cart.book_id))
    initLoad()
  }, [])

  return (
    <>
    {amount ?
    <div className='cartItem'>
      <Link to={`../books/${cart.book_id}`} state={{book}}>
        <p>{book?.title}</p>
      </Link>
      <Counter amount={amount} setAmount={setAmount} />
    </div>
    : ''
  }
    
    </>
    
  )
}
