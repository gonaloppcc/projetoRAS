import {FetcherProps} from '@hooks/Fetcher';
import {Bet} from '@domain/Bet';
import {useQuery} from '@tanstack/react-query';
import {getBets} from '../services/backend/bet';
import {AxiosError} from 'axios';
import toast from 'react-hot-toast';

export interface useBetsProps extends FetcherProps {
    bets: Bet[];
}

export const useBets = (userId: string): useBetsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: bets,
        error,
        refetch,
    } = useQuery(['bets', userId], () => getBets({userId}), {
        onError: (err) => toast.error((err as AxiosError).message),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        bets: (bets || []) as unknown as Bet[],
        error: error as AxiosError,
        refetch,
    };
};
