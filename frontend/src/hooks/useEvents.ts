import {useQuery} from '@tanstack/react-query';
import {getEvents} from '../services/event';

export const useEvents = (sportId: string) => {
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
