import axios from "axios";

export interface User {
    id?: number;
    email:	string;
    password:	string;
    is_superuser?: boolean;
    is_staff?: boolean;
    is_active?: boolean;
    date_joined?: string;
    last_login?: string;
}

export const checkAvailableEmail = async (email: string): Promise<boolean> => {
    return axios.get('api/users/available', { params: {email: email}})
        .then(res => res.data.is_available)
        .catch((err) => err)
}

export const signUp = async (email: string, password: string): Promise<User> => {

    return axios.post('api/users/', {
                email: email,
                password: password 
            }).then(res => {
                return res.data
            })
}