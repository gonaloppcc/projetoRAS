import {Specialist, User} from '@domain/User';
import {BASE_URL} from './constants';
import axios from 'axios';

export const login = async (email: string, password: string): Promise<User> => {
    const response = await axios.post(`${BASE_URL}/users`, {
        email,
        password,
    });
    return response.data as User;
};

export const registerBetter = async (
    username: string,
    email: string,
    password: string,
    nif: string,
    cellphone: string,
    cc: string
): Promise<User> => {
    const response = await axios.post(`${BASE_URL}/users/betters`, {
        username,
        email,
        password,
        nif,
        cellphone,
        cc,
    });
    return response.data as User;
};

export const addBalance = async (
    userId: string,
    amount: number
): Promise<number> => {
    const response = await axios.patch(
        `${BASE_URL}/users/balance?id=${userId}&balance=${amount}`
    );

    return response.data as number;
};
export const addSpecialist = async (specialist: Specialist): Promise<User> => {
    const response = await axios.post(
        `${BASE_URL}/users/specialists`,
        specialist
    );
    return response.data as User;
};
