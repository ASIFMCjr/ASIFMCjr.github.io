import { AuthorItem, authorApi } from 'entities/author'
import { Pagination } from 'entities/pagination'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './index.sass'

export const AuthorCard = () => {
    const [authors, setAuthors] = useState<authorApi.Authors>()

    const page_params = useLocation()
  
    const params = new URLSearchParams(page_params.search)
    const page_size = params.get('page_size')
    const page = params.get('page')
  
    useEffect(() => {
      const initLoad = async () => setAuthors(await authorApi.getAuthors(page_size ? Number(page_size) : undefined ,page ? Number(page) : undefined))
      initLoad()
    }, [page_size, page])
  
    return (
      <div >
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
