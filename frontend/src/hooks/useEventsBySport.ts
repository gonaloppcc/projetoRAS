import {useQuery} from '@tanstack/react-query';
import {getEventsBySport} from '../services/backend/event';
import {Event} from '@domain/Event';
import {FetcherProps} from '@hooks/Fetcher';
import {AxiosError} from 'axios';

export interface useEventsBySportProps extends FetcherProps {
    events: Event[];
}

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
        events: events as unknown as Event[],
        error: (error ?? '') as AxiosError,
        refetch,
    };
};
