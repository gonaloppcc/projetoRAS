import {useQuery} from '@tanstack/react-query';
import {getEvent} from '../services/backend/event';
import {Event} from '@domain/Event';
import {FetcherProps} from '@hooks/Fetcher';

export interface useEventsProps extends FetcherProps {
    event: Event;
}

export const useEvent = (eventId: string): useEventsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: event,
        error,
        refetch,
    } = useQuery(['event', eventId], () => getEvent(eventId));

    return {
        isSuccess,
        isLoading,
        isError,
        event: event as unknown as Event,
        error: error as string,
        refetch,
    };
};
