import {FetcherProps} from '@hooks/Fetcher';
import {Competition} from '@domain/Event';
import {useQuery} from '@tanstack/react-query';
import {getCompetitions} from '../services/backend/competitions';

export interface useCompetitionProps extends FetcherProps {
    competitions: Competition[];
}

export const useCompetitions = (sportId: string): useCompetitionProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: competitions,
        error,
        refetch,
    } = useQuery(['competitions'], () => getCompetitions(sportId));

    return {
        isSuccess,
        isLoading,
        isError,
        competitions: competitions as unknown as Competition[],
        error: error as string,
        refetch,
    };
};
