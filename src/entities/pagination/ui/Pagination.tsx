import React, { useMemo } from 'react'
import './index.sass'
import leftArrow from 'assets/leftArrow.svg'
import rightArrow from 'assets/rightArrow.svg'
import { useAppDispatch } from 'shared/model/hooks'
import { fetchBooks } from 'entities/book'

type paginationProps = {
	pages: number
	current_page: number
	sibling_count?: number
}

const usePagination = ({
	pages,
	sibling_count = 1,
	current_page,
	DOTS,
}: paginationProps & { DOTS: number }) => {
	const paginationRange = useMemo(() => {
		const range = (start: number, end: number) => {
			const length = end - start + 1
			return Array.from({ length }, (_, idx) => idx + start)
		}

		const totalPageNumbers = sibling_count + 5

		if (totalPageNumbers >= pages) {
			return range(1, pages)
		}

		const leftSiblingIndex = Math.max(current_page - sibling_count, 1)
		const rightSiblingIndex = Math.min(current_page + sibling_count, pages)

		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex < pages - 2

		const firstPageIndex = 1
		const lastPageIndex = pages

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * sibling_count
			const leftRange = range(1, leftItemCount)

			return [...leftRange, DOTS, pages]
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * sibling_count
			const rightRange = range(pages - rightItemCount + 1, pages)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [pages, sibling_count, current_page])

	return paginationRange
}

export const Pagination: React.FC<paginationProps> = ({
	pages,
	current_page,
	sibling_count = 1,
}) => {
	const DOTS = 0

	const paginationRange = usePagination({
		pages,
		sibling_count,
		current_page,
		DOTS,
	})!

	const dispatch = useAppDispatch()
	if (current_page === 0 || paginationRange.length < 2) {
		return null
	}

	const onNext = () => {
		dispatch(fetchBooks({ page: current_page + 1 }))
		scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}

	const onPrevious = () => {
		dispatch(fetchBooks({ page: current_page - 1 }))
		scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}

	const lastPage = paginationRange[paginationRange.length - 1]
	return (
		<div className="pagination">
			{current_page !== 1 && (
				<img
					src={leftArrow}
					height={10}
					className="arrow left"
					onClick={onPrevious}
				/>
			)}

			{paginationRange.map((pageNumber) => {
				if (pageNumber === DOTS) {
					return (
						<span key="dot" className="dots">
							&#8230;
						</span>
					)
				}

				return (
					<button
						className={`pagination-item ${pageNumber === current_page ? 'active' : ''}`}
						key={pageNumber}
						onClick={() => {
							dispatch(fetchBooks({ page: pageNumber }))
							scrollTo({ top: 0, left: 0, behavior: 'smooth' })
						}}
					>
						{pageNumber}
					</button>
				)
			})}

			{current_page !== lastPage && (
				<img
					src={rightArrow}
					height={10}
					className="arrow right"
					onClick={onNext}
				/>
			)}
		</div>
	)
}
