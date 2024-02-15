import React from 'react'
import { Author } from '../api/authorApi'

export const AuthorItem: React.FC<Author> = ({ first_name, second_name }) => {
	return (
		<div>
			{first_name} {second_name}
		</div>
	)
}
