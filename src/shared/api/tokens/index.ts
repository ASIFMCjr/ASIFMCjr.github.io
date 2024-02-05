import axios from "axios"
import Cookies from "js-cookie";

export interface Token {
    refresh: string;
    access: string;
}

export const getToken = async (): Promise<string> => {

    const access = localStorage.getItem('access')

    return access ? access : (await revokeToken()).access
}

export const createTokens = async (email: string, password: string): Promise<Token> => {

    return axios.post<Token>('api/token/', {
        email: email,
        password: password
    }).then(res => {
        localStorage.setItem('access', res.data.access)
        Cookies.set('refresh', res.data.refresh)

        return res.data
    }).catch(err => err)
}

export const revokeToken = async (): Promise<Token> => {

    const refresh = Cookies.get('refresh')

    return axios.post<Token>('api/token/refresh', {refresh: refresh }).then(res => res.data)
}