import { bookApi } from 'entities/book'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { revokeToken } from 'shared/api';

export const Book = () => {

  const [book, setBook] = useState<bookApi.Book>()

  const { bookId } = useParams();

  useEffect(() => {
    const initLoad = async () => setBook(await bookApi.getBook(bookId!))
    initLoad()
  }, [])

  revokeToken()
  return (
    <div>
      <ul>
              <li key={book?.id}>
                <p>{book?.title}</p>
                <p>{book?.description}</p>
                <p>{book?.price}</p>
              </li>
        </ul>
    </div>
  )
}
