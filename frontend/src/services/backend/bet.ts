import {BASE_URL} from './constants';
import axios from 'axios';
import {SimpleBet} from '@domain/Bet';

export interface AddSimpleBetProps {
    oddId: string;
    betterId: string;
    amount: number;
}

export interface AddMultipleBetProps {
    betterId: string;
    amount: number;
    odds: {
        oddId: string;
        eventId: string;
    }[];
}

export const addSimpleBet = async (
    betProps: AddSimpleBetProps
): Promise<SimpleBet> => {
    const response = await axios.post(`${BASE_URL}/bets`, {
        type: 'SimpleBet',
        bet: betProps,
    });
    return response.data as SimpleBet;
};

export const getBets = async ({
    userId,
}: {
    userId: string;
}): Promise<SimpleBet[]> => {
    const response = await axios.get(`${BASE_URL}/bets?userId=${userId}`);
    return response.data as SimpleBet[];
};

export const deleteBet = async (betId: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/bets/${betId}`);
};

export const addMultipleBet = async (
    betProps: AddMultipleBetProps
): Promise<SimpleBet> => {
    const response = await axios.post(`${BASE_URL}/bets`, {
        type: 'MultiBet',
        bet: betProps,
    });
    return response.data as SimpleBet;
};
