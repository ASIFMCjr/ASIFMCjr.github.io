import { bookApi } from 'entities/book'
import { cartApi } from 'entities/cart';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from 'shared/ui';

export const Book = () => {

  const [book, setBook] = useState<bookApi.Book>()
  const [bookAmount, setBookAmount] = useState<number>(1)

  const { bookId } = useParams();

  useEffect(() => {
    const initLoad = async () => setBook(await bookApi.getBook(bookId || ''))
    initLoad()
  }, [])

  return (
    <div>
      {book && <>
      
        <ul>
              <li key={book.id}>
                <p>{book.title}</p>
                <p>{book.description}</p>
                <p>{book.price}</p>
              </li>
        </ul>
        Amount <input type="number" name="" id="" value={bookAmount} onChange={(e) => setBookAmount(Number(e.target.value))}/>
        <Button text='Add to Cart' onClick={() => cartApi.updateCart({book_id: book.id, amount: bookAmount})}/>
        </>}
      
        
    </div>
  )
}
