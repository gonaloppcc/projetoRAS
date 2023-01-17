import {useQuery} from '@tanstack/react-query';
import {EventReceived, getEventsBySport} from '../services/backend/event';
import {FetcherProps} from '@hooks/Fetcher';
import {AxiosError} from 'axios';

export interface useEventsBySportProps extends FetcherProps {
    events: EventReceived[];
}

export const useEvents = (sportId: string): useEventsBySportProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(['events', sportId], () => getEventsBySport({sportId}));

    return {
        isSuccess,
        isLoading,
        isError,
        events: (events || []) as unknown as EventReceived[],
        error: (error ?? '') as AxiosError,
        refetch,
    };
};

export const useEventsBySport = (sportId: string): useEventsBySportProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(['events', sportId], () => getEventsBySport({sportId}));

    return {
        isSuccess,
        isLoading,
        isError,
        events: events as unknown as EventReceived[],
        error: error as AxiosError,
        refetch,
    };
};
