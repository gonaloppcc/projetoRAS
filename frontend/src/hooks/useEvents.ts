import {useQuery} from '@tanstack/react-query';
import {getEvents, getEventsBySport} from '../services/backend/event';
import {Event, EventMini} from '@domain/Event';
import {FetcherProps} from '@hooks/Fetcher';

export interface useEventsProps extends FetcherProps {
    events: Event[];
}

export interface useEventsBySportProps extends FetcherProps {
    events: EventMini[];
}

export const useEvents = (compId: string): useEventsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(['events', compId], () => getEvents({compId}));

    return {
        isSuccess,
        isLoading,
        isError,
        events: events as unknown as Event[],
        error: error as string,
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
        error: error as string,
        refetch,
    };
};
