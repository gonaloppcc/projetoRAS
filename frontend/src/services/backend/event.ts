import {EventPost} from '@domain/Event';
import axios from 'axios';
import {BASE_URL} from './constants';

export const getEvents = async ({
    compId,
    pageNum = 0,
    pageSize = 20,
}: {
    compId: string;
    pageNum?: number;
    pageSize?: number;
}): Promise<Event[]> => {
<<<<<<< Updated upstream
    const response = await axios.get(`${BASE_URL}/events`, {
        params: {compId, pageNum, pageSize},
=======
    const response = await axios.get(`${BASE_URL}/events/competition`, {
        params: {compId: competitionId, pageNum, pageSize},
    });
    return response.data as Event[];
};

export const getEventsBySport = async ({
    sportId,
    pageNum = 0,
    pageSize = 20,
}: {
    sportId: string;
    pageNum?: number;
    pageSize?: number;
}) => {
    const response = await axios.get(`${BASE_URL}/events/sport`, {
        params: {sportId, pageNum, pageSize},
>>>>>>> Stashed changes
    });
    return response.data as Event[];
};

export const getEvent = async (eventId: string): Promise<Event> => {
    const response = await axios.get(`${BASE_URL}/events/${eventId}`);
    return response.data as Event;
};

export const postEvent = async (event: EventPost): Promise<Event> => {
    const response = await axios.post(`${BASE_URL}/events`, event);
    // TODO: To Be tested
    return response.data as Event;
};
