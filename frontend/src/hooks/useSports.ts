import {FetcherProps} from '@hooks/Fetcher';
import {Sport} from '@domain/Event';
import {useQuery} from '@tanstack/react-query';
import {getSports} from '../services/backend/sports';
import {AxiosError} from 'axios';
import toast from 'react-hot-toast';

export interface useSportsProps extends FetcherProps {
    sports: Sport[];
}

export const useSports = (): useSportsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: sports,
        error,
        refetch,
    } = useQuery(['sports'], () => getSports(), {
        onError: (err) => toast.error((err as AxiosError).message),
    });

    return {
        isSuccess,
        isLoading,
        isError,
        sports: (sports || []) as unknown as Sport[],
        error: error as AxiosError,
        refetch,
    };
};
