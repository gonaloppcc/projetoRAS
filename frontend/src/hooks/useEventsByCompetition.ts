import {useQuery} from '@tanstack/react-query';
import {getEventsByCompetition} from '../services/backend/event';
import {Event} from '@domain/Event';
import {FetcherProps} from '@hooks/Fetcher';
import {AxiosError} from 'axios';

export interface useEventsByCompetitionProps extends FetcherProps {
    events: Event[];
}

export const useEventsByCompetition = (
    compId: string
): useEventsByCompetitionProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(['events', compId], () =>
        getEventsByCompetition({competitionId: compId})
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
