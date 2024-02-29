import { axiosInstance } from 'shared/api'

export interface Books {
	result: Array<Book>
	page: number
	total_pages: number
	total_items: number
	page_size: number
	links: {
		next: string | null
		previous: string | null
	}
}

export interface Book {
	author: Array<number>
	genres: Array<number>
	id: number
	title: string
	description: string
	price: number
	in_stock: number
	writing_date: string
	release_date: string
}

export interface GetBookParams
	extends Partial<
		Omit<Book, 'author' | 'genres' | 'id' | 'description' | 'in_stock'>
	> {
	page_size?: number
	page?: number
	genre?: string
	author?: string
	price_gte?: number
	price_lte?: number
	release_date_gte?: string
	release_date_lte?: string
	writing_date_gte?: string
	writing_date_lte?: string
	ordering?: string
}

export const getBooks = async (props?: GetBookParams): Promise<Books> => {
	return (await axiosInstance.get(`api/books/`, { params: props })).data
}

export const getBook = async (id: number): Promise<Book> =>
	(await axiosInstance.get(`api/books/${id}`)).data
