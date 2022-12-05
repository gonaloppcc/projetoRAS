import {FetcherProps} from '@hooks/Fetcher';
import {Bet} from '@domain/Bet';
import {useQuery} from '@tanstack/react-query';
import {getBets} from '../services/backend/bet';

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
    } = useQuery(['bets', userId], () => getBets({userId}));

    return {
        isSuccess,
        isLoading,
        isError,
        bets: bets as unknown as Bet[],
        error: error as string,
        refetch,
    };
};
