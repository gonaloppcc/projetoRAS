import {useQuery} from '@tanstack/react-query';
import {EventReceived, getEventsBySport} from '../services/backend/event';
import {FetcherProps} from '@hooks/Fetcher';
import {AxiosError} from 'axios';

export interface useEventsBySportProps extends FetcherProps {
    events: EventReceived[];
    pageNum?: number;
    pageSize?: number;
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

export interface useEventsBySport {
    sportId: string;
    pageNum?: number;
    pageSize?: number;
}
export const useEventsBySport = ({
    sportId,
    pageNum,
    pageSize = 8,
}: useEventsBySport): useEventsBySportProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(['events', sportId], () =>
        getEventsBySport({sportId, pageNum, pageSize})
    );

    return {
        isSuccess,
        isLoading,
        isError,
        events: events as unknown as EventReceived[],
        error: error as AxiosError,
        refetch,
    };
};
