import {useQuery} from '@tanstack/react-query';
import {getEvents} from '../services/event';
import {Event} from '../domain/Event';

export interface useEventsProps {
    limit?: number;
    offset?: number;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    events: Event[];
    error: string;
}

export const useEvents = (compId: string): useEventsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
    } = useQuery(['events', compId], () => getEvents({compId}));

    return {
        isSuccess,
        isLoading,
        isError,
        events: events as unknown as Event[],
        error: error as string,
    };
};
