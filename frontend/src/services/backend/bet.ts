import {BASE_URL} from './constants';
import axios from 'axios';
import {SimpleBet} from '@domain/Bet';

export interface AddSimpleBetProps {
    Date: string;
    OddId: string;
    BetterId: string;
    Amount: number;
    EventId: string;
}

interface AddMultipleBetProps {
    Date: string;
    BetterId: string;
    Amount: number;
    Odds: {
        OddId: string;
        EventId: string;
    }[];
}

export const addSimpleBet = async (
    betProps: AddSimpleBetProps
): Promise<SimpleBet> => {
    const response = await axios.post(`${BASE_URL}/bets`, {
        Type: 'SimpleBet',
        ...betProps,
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
        Type: 'MultiBet',
        ...betProps,
    });
    return response.data as SimpleBet;
};
