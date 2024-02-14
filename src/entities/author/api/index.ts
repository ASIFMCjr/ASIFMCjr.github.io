import { axiosInstance } from 'shared/api'

export interface Authors {
	result: Array<Author>
	page: number
	total_pages: number
	total_items: number
	page_size: number
	links: {
		next: string | null
		previous: string | null
	}
}

export interface Author {
	id: number
	first_name: string
	second_name: string
}

export const getAuthors = async (
	page_size?: number,
	page?: number
): Promise<Authors> =>
	(
		await axiosInstance.get(
			`api/authors/${page_size ? '?page_size=' + page_size : ''}${page ? '?page=' + page : ''}`
		)
	).data

export const getAuthor = async (id: number): Promise<Author> =>
	(await axiosInstance.get(`api/authors/${id}`)).data
