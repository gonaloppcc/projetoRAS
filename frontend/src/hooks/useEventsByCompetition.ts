import {useQuery} from '@tanstack/react-query';
import {getEventsByCompetition} from '../services/backend/event';
import {Event} from '@domain/Event';
import {FetcherProps} from '@hooks/Fetcher';
import {AxiosError} from 'axios';

export interface UseEventsByCompetitionReturnType extends FetcherProps {
    events: Event[];
}

interface UseEventsByCompetitionProps {
    compId: string;
    pageNum?: number;
    pageSize?: number;
}

export const useEventsByCompetition = ({
    compId,
    pageNum = 0,
    pageSize = 5,
}: UseEventsByCompetitionProps): UseEventsByCompetitionReturnType => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(
        ['events', compId, pageNum],
        () =>
            getEventsByCompetition({competitionId: compId, pageNum, pageSize}),
        {keepPreviousData: true}
    );

    return {
        isSuccess,
        isLoading,
        isError,
        events: events as unknown as Event[],
        error: (error ?? '') as AxiosError,
        refetch,
    };
};
