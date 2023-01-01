import {useQuery} from '@tanstack/react-query';
import {getEventsByCompetition} from '../services/backend/event';
import {Event} from '@domain/Event';
import {FetcherProps} from '@hooks/Fetcher';
import toast from 'react-hot-toast';
import {AxiosError} from 'axios';

export interface useEventsProps extends FetcherProps {
    events: Event[];
}

export const useEvents = (compId: string): useEventsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(
        ['events', compId],
        () => getEventsByCompetition({competitionId: compId}),
        {
            onError: (err) => toast.error((err as AxiosError).message),
        }
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
