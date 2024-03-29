import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useAppDispatch } from 'shared/model/hooks'
import { Filters, setFilter } from 'widgets/book/filter/model/bookFilterSlice'
import './multiRangeSlider.css'

interface Props {
	min: number
	max: number
	filterName: 'price' | 'release_date'
}

export const TwoSidesRangeInput: React.FC<Props> = ({
	min,
	max,
	filterName,
}) => {
	const [minVal, setMinVal] = useState(min)
	const [maxVal, setMaxVal] = useState(max)
	const minValRef = useRef(min)
	const maxValRef = useRef(max)
	const range = useRef<HTMLDivElement | null>(null)
	const dispatch = useAppDispatch()

	const getPercent = useCallback(
		(value: number) => Math.round(((value - min) / (max - min)) * 100),
		[min, max]
	)

	useEffect(() => {
		const minPercent = getPercent(minVal)
		const maxPercent = getPercent(maxValRef.current)

		if (range.current) {
			range.current.style.left = `${minPercent}%`
			range.current.style.width = `${maxPercent - minPercent}%`
		}
	}, [minVal, getPercent])

	useEffect(() => {
		const minPercent = getPercent(minValRef.current)
		const maxPercent = getPercent(maxVal)

		if (range.current) {
			range.current.style.width = `${maxPercent - minPercent}%`
		}
	}, [maxVal, getPercent])

	return (
		<div className="container">
			<input
				type="range"
				min={min}
				max={max}
				value={minVal}
				onChange={(event) => {
					const value = Math.min(Number(event.target.value), maxVal - 1)
					setMinVal(value)
					minValRef.current = value
					const name: keyof Filters = `${filterName}_gte`
					dispatch(
						setFilter({
							name,
							value: filterName === 'price' ? value : `${value}-01-01`,
						})
					)
				}}
				className="thumb thumb--left"
				style={{ zIndex: minVal > max - 100 ? '5' : undefined }}
			/>
			<input
				type="range"
				min={min}
				max={max}
				value={maxVal}
				onChange={(event) => {
					const value = Math.max(Number(event.target.value), minVal + 1)
					setMaxVal(value)
					maxValRef.current = value
					const name: keyof Filters = `${filterName}_lte`
					dispatch(
						setFilter({
							name,
							value: filterName === 'price' ? value : `${value}-12-31`,
						})
					)
				}}
				className="thumb thumb--right"
			/>

			<div className="slider">
				<div className="slider__track" />
				<div ref={range} className="slider__range" />
				<div className="slider__left-value">{minVal}</div>
				<div className="slider__right-value">{maxVal}</div>
			</div>
		</div>
	)
}
