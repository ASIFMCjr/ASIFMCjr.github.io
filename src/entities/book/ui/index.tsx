import React from 'react'
import { Book } from '../api'

export const BookItem: React.FC<Book> = (props) => {
  return (
    <div>
        {props.title}
    </div>
  )
}
