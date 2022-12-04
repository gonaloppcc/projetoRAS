import {useQuery} from '@tanstack/react-query';
import {getEvent} from '../services/event';

export interface useEventsProps {
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    event: Event;
    error: string;
}

export const useEvent = (eventId: string): useEventsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: event,
        error,
    } = useQuery(['event', eventId], () => getEvent(eventId));

    return {
        isSuccess,
        isLoading,
        isError,
        event,
        error: error as string,
    };
};
