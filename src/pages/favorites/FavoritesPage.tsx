import { fetchFavorites } from 'entities/favorites/model/favoritesSlice'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import bookimg from 'assets/book.png'

export const FavoritesPage = () => {
	const favorites = useAppSelector((state) => state.favorites)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchFavorites({}))
	}, [])

	return (
		<div style={{ margin: 'auto' }}>
			<h1>Favorites</h1>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					flexWrap: 'wrap',
				}}
			>
				{favorites?.result?.map((favorite) => {
					const book = favorite.book
					return (
						<div key={favorite.favorite_item_id}>
							<Link
								to={`/books/${book.id}`}
								// state={{ book: book }}
								onClick={() =>
									scrollTo({ top: 0, left: 0, behavior: 'smooth' })
								}
							>
								<div className="book_card">
									<div className="book_card__top">
										<img
											src={bookimg}
											alt=""
											height={'100%'}
											className="book_card__top-img"
										/>
									</div>
									<div className="book_card__bottom">
										<div>{book.title}</div>
										<div className="price">{book.price} p</div>
									</div>
								</div>
							</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}
