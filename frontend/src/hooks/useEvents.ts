import {useQuery} from '@tanstack/react-query';
import {getEvents} from '../services/event';

export interface useEventsProps {
    limit?: number;
    offset?: number;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    events: Event[];
    error: string;
}

export const useEvents = (sportId: string): useEventsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
    } = useQuery(['events', sportId], () => getEvents({sportId}));

    return {
        isSuccess,
        isLoading,
        isError,
        events,
        error: error as string,
    };
};
