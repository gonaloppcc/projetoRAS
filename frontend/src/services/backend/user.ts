import {Notification, Specialist, Transaction, User} from '@domain/User';
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

export const getTransactions = async (
    userId: string
): Promise<Transaction[]> => {
    const response = await axios.get(
        `${BASE_URL}/users/${userId}/transactionHist`
    );

    return response.data as Transaction[];
};
export const addSpecialist = async (specialist: Specialist): Promise<User> => {
    const response = await axios.post(
        `${BASE_URL}/users/specialists`,
        specialist
    );
    return response.data as User;
};

export const getNotifications = async (
    userId: string
): Promise<Notification[]> => {
    const response = await axios.get(
        `${BASE_URL}/users/${userId}/notifications`
    );
    return response.data as Notification[];
};

export const deleteNotification = async (
    userId: string,
    notificationId: string
): Promise<void> => {
    await axios.delete(
        `${BASE_URL}/users/${userId}/notifications/${notificationId}`
    );
};
