import { axiosInstance } from "shared/api";

export interface Books {
    result: Array<Book>;
    page: number;
    total_pages: number;
    total_items: number;
    page_size: number;
    links: {
        next: string | null;
        previous: string | null;
    }
}

export interface Book {
    author: Array<number>;
    genres: Array<number>;
    id: number;
    title: string;
    description: string;
    price: number;
    in_stock: number;
    writing_date: string | Date;
    release_date: string | Date;
}

export const getBooks = async (page_id?: string): Promise<Books> => axiosInstance.get(page_id ? `api/books/?page=${page_id}` : 'api/books').then(res => res.data)

export const getBook = async (id: string): Promise<Book> => axiosInstance.get(`api/books/${Number(id)}`).then(res => res.data)