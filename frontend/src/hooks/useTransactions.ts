import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {Transaction} from '@domain/User';
import {FetcherProps} from '@hooks/Fetcher';
import {getTransactions} from '../services/backend/user';
import {useProfile} from '@state/useProfile';

export interface useTransactionsProps extends FetcherProps {
    transactions: Transaction[];
}

export const useTransactions = (): useTransactionsProps => {
    const {id: userId} = useProfile();

    const {
        isSuccess,
        isLoading,
        isError,
        data: transactions,
        error,
        refetch,
    } = useQuery(['transactions', userId], () => getTransactions(userId));

    return {
        isSuccess,
        isLoading,
        isError,
        transactions: (transactions || []) as Transaction[],
        error: error as AxiosError,
        refetch,
    };
};
