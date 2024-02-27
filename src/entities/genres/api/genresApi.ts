import { axiosInstance } from 'shared/api'

export interface Genre {
	id: number
	title: string
	description: string
	discount: number
}

export interface Genres {
	count: number
	next: string
	previous: string
	results: Array<Genre>
}

export const getGenre = async (id: number): Promise<Genre> =>
	(await axiosInstance.get(`api/genres/${id}`)).data

export const getGenres = async (props?: {
	page: number
	page_size: number
}): Promise<Genres> =>
	(await axiosInstance.get(`api/genres/`, { params: props })).data
