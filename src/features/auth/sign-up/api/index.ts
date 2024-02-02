import axios from "axios";
// import { useAppDispatch } from "shared/model/hooks";
// import { setUser } from "../model/slice";
// import { store } from "app/store";

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

const checkAvailableEmail = async (email: string) => {
    return axios.get('api/users/available', { params: {email: email}})
        .then(res => res.data)
        .catch((err) => err)
}

export const signUp = async (email: string, password: string) => {
    const availableEmail = await checkAvailableEmail(email)
    if (!availableEmail.is_available) { return availableEmail }

    return await axios.post('api/users/', {
                email: email,
                password: password 
            }).then(res => {
                return res.data
            })
}  