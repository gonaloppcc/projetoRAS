import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {Event} from '../types/Event';

const API_EVENTS_URL = `/api/events`;

const fetchEvents = async () => {
    const response = await axios.get(API_EVENTS_URL);

    return response.data;
};

interface useEventsProps {
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    events: Event[];
    error: string;
}

export const useEvents = (): useEventsProps => {
    const {
        isSuccess,
        isLoading,
        isError,
        data: events,
        error,
    } = useQuery(['events'], fetchEvents);

    return {
        isSuccess,
        isLoading,
        isError,
        events,
        error: error as string,
    };
};
