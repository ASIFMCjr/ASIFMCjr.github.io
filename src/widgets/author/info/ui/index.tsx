import { authorApi } from 'entities/author'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const AuthorInfo = () => {
	const [author, setAuthor] = useState<authorApi.Author>()

	const { authorId } = useParams()

	useEffect(() => {
		const initLoad = async () =>
			setAuthor(await authorApi.getAuthor(Number(authorId)))
		initLoad()
	}, [])

	return (
		<div>
			<ul>
				<li key={author?.id}>
					<p>{author?.first_name}</p>
				</li>
			</ul>
		</div>
	)
}
