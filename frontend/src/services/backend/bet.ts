import {BASE_URL} from './constants';
import axios from 'axios';
import {Bet} from '@domain/Bet';

export interface AddSimpleBetProps {
    Date: string;
    OddId: string;
    BetterId: string;
    Amount: number;
}

interface AddMultipleBetProps {}

export const addSimpleBet = async (
    betProps: AddSimpleBetProps
): Promise<Bet> => {
    const response = await axios.post(`${BASE_URL}/bets`, {
        Type: 'SimpleBet',
        ...betProps,
    });
    return response.data as Bet;
};

export const getBets = async ({userId}: {userId: string}): Promise<Bet[]> => {
    const response = await axios.get(`${BASE_URL}/bets?userId=${userId}`);
    return response.data as Bet[];
};

export const deleteBet = async (betId: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/bets/${betId}`);
};

export const addMultipleBet = async (
    betProps: AddMultipleBetProps
): Promise<Bet> => {
    const response = await axios.post(`${BASE_URL}/bets`, {
        Type: 'MultipleBet',
        ...betProps,
    });
    return response.data as Bet;
};
