import axios from 'axios'

export interface User {
	id?: number
	email: string
	password: string
	is_superuser?: boolean
	is_staff?: boolean
	is_active?: boolean
	date_joined?: string
	last_login?: string
	is_auth?: boolean
}

export const checkAvailableEmail = async (email: string): Promise<boolean> =>
	(
		await axios.get<{ is_available: boolean }>('api/users/available', {
			params: { email },
		})
	).data.is_available

export const signUp = async (email: string, password: string): Promise<User> =>
	(await axios.post<User>('api/users/', { email, password })).data
