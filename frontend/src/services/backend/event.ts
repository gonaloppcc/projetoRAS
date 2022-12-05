import axios from 'axios';
import {BASE_URL} from './constants';

export const getEvents = async ({
    compId,
    pageNum = 0,
    pageSize = 10,
}: {
    compId: string;
    pageNum?: number;
    pageSize?: number;
}): Promise<Event[]> => {
    const response = await axios.get(`${BASE_URL}/events`, {
        params: {compId, pageNum, pageSize},
    });
    return response.data as Event[];
};

export const getEvent = async (eventId: string): Promise<Event> => {
    console.log(`${BASE_URL}/events/${eventId}`);
    const response = await axios.get(`${BASE_URL}/events/${eventId}`);
    return response.data as Event;
};

export const addEvent = async (event: Event): Promise<Event> => {
    const response = await axios.post(`${BASE_URL}/events`, event);
    // TODO: To Be tested
    return response.data as Event;
};
