import React from 'react'
import { Book } from '../api/bookApi'
import './index.sass'
import book from 'assets/book.png'

export const BookItem: React.FC<Book> = ({ title, price }) => {
	return (
		<div className="book_card">
			<div className="book_card__top">
				<img src={book} alt="" height={'100%'} className="book_card__top-img" />
			</div>
			<div className="book_card__bottom">
				<div>{title}</div>
				<div className="price">{price} p</div>
			</div>
		</div>
	)
}
