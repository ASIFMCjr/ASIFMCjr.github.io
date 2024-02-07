import React from 'react'
import { Author } from '../api'

export const AuthorItem: React.FC<Author> = (props) => {
  return (
    <div>
        {props.first_name}
    </div>
  )
}
