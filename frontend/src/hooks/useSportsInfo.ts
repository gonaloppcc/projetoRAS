import {FetcherProps} from '@hooks/Fetcher';
import {InfoSport} from '@domain/Event';
import {useQuery} from '@tanstack/react-query';
import {getSports} from '../services/backend/sports';

export interface useSportsProps extends FetcherProps {
    sports: InfoSport[];
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
        sports: (sports || []) as unknown as InfoSport[],
        error: error as string,
        refetch,
    };
};