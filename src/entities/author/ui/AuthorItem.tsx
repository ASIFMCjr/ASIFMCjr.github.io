import React from 'react'
import { Author } from '../api/authorApi'
import './index.sass'
import user from 'assets/user.svg'

export const AuthorItem: React.FC<Author> = ({ first_name, second_name }) => {
	return (
		<div className="authors-item">
			<img src={user} alt="" className="authors-item__img" />
			<p className="authors-item__info">
				{first_name} {second_name}
			</p>
		</div>
	)
}
