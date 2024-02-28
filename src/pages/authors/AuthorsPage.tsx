import { fetchAuthors } from 'entities/author/model/authorSlice'
import React, { useEffect } from 'react'
import { useAppDispatch } from 'shared/model/hooks'
import { AuthorCard } from 'widgets/author/card'

export const AuthorsPage = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchAuthors({}))
	}, [])
	return (
		<div style={{ margin: 'auto' }}>
			<AuthorCard />
		</div>
	)
}
