import { axiosInstance } from "shared/api";

export interface Authors {
    result: Array<Author>;
    page: number;
    total_pages: number;
    total_items: number;
    page_size: number;
    links: {
        next: string | null;
        previous: string | null;
    }
}

export interface Author {
    id: number;
    first_name: string;
    second_name: string;
}

export const getAuthors = async (page_id?: string): Promise<Authors> => (await axiosInstance.get(page_id ? `api/authors/?page=${page_id}` : 'api/authors')).data

export const getAuthor = async (id: string): Promise<Author> => (await axiosInstance.get(`api/authors/${Number(id)}`)).data