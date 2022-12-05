import {useQuery} from '@tanstack/react-query';
import {getEvents} from '../services/backend/event';
import {Event} from '@domain/Event';
import {FetcherProps} from '@hooks/Fetcher';

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
