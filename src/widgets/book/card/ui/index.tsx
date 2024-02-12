import { BookItem, bookApi } from 'entities/book'
import { Pagination } from 'entities/pagination'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Book = () => {

  const [books, setBooks] = useState<bookApi.Books>()

  const page_params = useLocation()

  const page_id = new URLSearchParams(page_params.search).get('page')

  useEffect(() => {
    const initLoad = async () => setBooks(await bookApi.getBooks(page_id ? page_id : ''))
    initLoad()
  }, [page_id])

  return (
    <div>
          {books?.result.map((book: bookApi.Book) => {
            return (
              <Link to={`${book.id}`} onClick={() => scrollTo({top: 0, left: 0, behavior: 'smooth'})} key={book.id}>
                
                  <BookItem {...book}/>
                
              </Link>
            )
          })}
        <Pagination pages={books ? books?.total_pages : 1} current_page={books ? books?.page : 1}/>
    </div>
  )
}
