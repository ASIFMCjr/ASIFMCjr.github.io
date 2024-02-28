import { fetchBooks } from 'entities/book/model/bookSlice'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { Button } from 'shared/ui'
import { TwoSidesRangeInput } from 'shared/ui/inputs/TwoSidesRangeInput'
import './index.sass'
export const BookFilter = () => {
	const dispatch = useAppDispatch()
	const filters = useAppSelector((state) => state.filters)
	return (
		<div className="filter">
			<h1>Filters</h1>
			<p>Price</p>
			<TwoSidesRangeInput min={0} max={10000} filterName="price" />
			<p>Release year</p>
			<TwoSidesRangeInput min={1970} max={2024} filterName="release_date" />
			<Button
				width="100%"
				text="Apply"
				onClick={() => dispatch(fetchBooks(filters))}
			/>
		</div>
	)
}
