import { AuthorItem, authorApi } from 'entities/author'
import { Pagination } from 'entities/pagination'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const AuthorCard = () => {
    const [authors, setAuthors] = useState<authorApi.Authors>()

    const page_params = useLocation()
  
    const page_id = new URLSearchParams(page_params.search).get('page')
  
    useEffect(() => {
      const initLoad = async () => setAuthors(await authorApi.getAuthors(page_id ? page_id : ''))
      initLoad()
    }, [page_id])
  
    return (
      <div>
            {authors?.result.map((author: authorApi.Author) => {
              return (
                <Link to={`${author.id}`} onClick={() => scrollTo({top: 0, left: 0, behavior: 'smooth'})} key={author.id}>
                  
                    <AuthorItem {...author}/>
                  
                </Link>
              )
            })}
          <Pagination pages={authors ? authors?.total_pages : 1} current_page={authors ? authors?.page : 1}/>
      </div>
    )
}
