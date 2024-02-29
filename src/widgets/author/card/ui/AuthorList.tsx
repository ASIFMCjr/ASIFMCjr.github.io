import { AuthorItem, authorApi } from 'entities/author'
import { Pagination } from 'entities/pagination'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'shared/model/hooks'
import './index.sass'

export const AuthorCard = () => {
	const authors = useAppSelector((state) => state.authors.authorsInfo)

	return (
		<div>
			{authors?.result.map((author: authorApi.Author) => {
				return (
					<Link
						to={`${author.id}`}
						onClick={() => scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
						key={author.id}
					>
						<AuthorItem {...author} />
					</Link>
				)
			})}
			<Pagination
				type="author"
				pages={authors ? authors?.total_pages : 1}
				current_page={authors ? authors?.page : 1}
			/>
		</div>
	)
}
