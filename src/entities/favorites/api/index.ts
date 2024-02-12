import { bookApi } from 'entities/book'
import { axiosInstance } from 'shared/api'

export interface Favorites {
	count: number
	next: string
	previous: string
	results: Array<Favorite>
}

export interface Favorite {
	favorite_item_id: number
	book: Array<bookApi.Book>
}

export const getFavorites = async (
	page?: number,
	page_size?: number
): Promise<Favorites> =>
	(
		await axiosInstance.get(
			`api/favorites/${page_size ? '?page_size=' + page_size : ''}${page ? '?page=' + page : ''}`
		)
	).data
export const postFavorites = async (book_id: number): Promise<Favorite> =>
	(await axiosInstance.post(`api/favorites/`, { book_id })).data
