import {FetcherProps} from '@hooks/Fetcher';
import {Sport} from '@domain/Event';
import {useQuery} from '@tanstack/react-query';
import {getSports} from '../services/backend/sports';

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
    } = useQuery(['sports'], () => getSports());

    return {
        isSuccess,
        isLoading,
        isError,
        sports: (sports || []) as unknown as Sport[],
        error: error as string,
        refetch,
    };
};
