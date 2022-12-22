import {User, Specialist} from '@domain/User';
import {BASE_URL} from './constants';
import axios from 'axios';

export const login = async (email: string, password: string): Promise<User> => {
    const response = await axios.post(`${BASE_URL}/users`, {
        email,
        password,
    });
    return response.data as User;
};

export const addBalance = async (
    userId: string,
    amount: number
): Promise<User> => {
    const response = await axios.patch(
        `${BASE_URL}/users/balance?id=${userId}&balance=${amount}`
    );

    return response.data as User;
};
export const postSpecialist = async (specialist: Specialist): Promise<User> => {
    const response = await axios.post(`${BASE_URL}/users/specialists`, {
        specialist,
    });
    return response.data as User;
};
