import { authorApi } from 'entities/author'
import React from 'react'
import { AuthorCard } from 'widgets/author/card'

export const AuthorsPage = () => {
  console.log(authorApi.getAuthors())
  return (
    <div>
      <AuthorCard/>
    </div>
  )
}

