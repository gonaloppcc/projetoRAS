import {useQuery} from '@tanstack/react-query';
import {EventReceived, getEventsBySport} from '../services/backend/event';
import {FetcherProps} from '@hooks/Fetcher';
import {AxiosError} from 'axios';

export interface useEventsBySportProps {
    sportId: string;
    pageNum?: number;
    pageSize?: number;
}

export interface UseEventsReturnType extends FetcherProps {
    events: EventReceived[];
}

export const useEvents = ({
    sportId,
    pageNum = 0,
    pageSize = 5,
}: useEventsBySportProps): UseEventsReturnType => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(['events', sportId, pageNum], () =>
        getEventsBySport({sportId, pageNum, pageSize})
    );

    return {
        isSuccess,
        isLoading,
        isError,
        events: (events || []) as unknown as EventReceived[],
        error: (error ?? '') as AxiosError,
        refetch,
    };
};

export const useEventsBySport = ({
    sportId,
    pageNum = 0,
    pageSize = 4,
}: useEventsBySportProps): UseEventsReturnType => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
        refetch,
    } = useQuery(['events', sportId, pageNum], () =>
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
