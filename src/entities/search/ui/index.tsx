import React, { useState } from 'react'
import search from 'assets/search.svg'
import './index.sass'
import { Link } from 'react-router-dom'
import { useAppDispatch } from 'shared/model/hooks'
import { fetchBooks } from 'entities/book/model/bookSlice'

export const SearchBar = () => {
	const [input, setInput] = useState<string>('')
	const dispatch = useAppDispatch()
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		alert(input)
	}
	return (
		<form className="search" onSubmit={handleSubmit}>
			<input
				className="search-input"
				id="search"
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<Link to={`books`} onClick={() => dispatch(fetchBooks({ title: input }))}>
				<img className="search-ico" alt="search" src={search} />
			</Link>
		</form>
	)
}
