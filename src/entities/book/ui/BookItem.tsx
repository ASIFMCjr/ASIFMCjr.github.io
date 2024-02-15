import React from 'react'
import { Book } from '../api/bookApi'
import './index.sass'

export const BookItem: React.FC<Book> = ({ title, price }) => {
	return (
		<div className="book_card">
			<div>{title}</div>
			<div>{price} p</div>
		</div>
	)
}
