import {User} from '@domain/User';
import {BASE_URL} from './constants';
import axios from 'axios';

export const login = async (email: string, password: string): Promise<User> => {
    const response = await axios.post(`${BASE_URL}/users`, {
        email,
        password,
    });
    return response.data as User;
};
