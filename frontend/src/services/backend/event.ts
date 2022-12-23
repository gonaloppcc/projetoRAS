import {EventPost} from '@domain/Event';
import axios from 'axios';
import {BASE_URL} from './constants';

export const getEvents = async ({
    compId,
    pageNum = 0,
    pageSize = 5,
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
    const response = await axios.get(`${BASE_URL}/events/${eventId}`);
    return response.data as Event;
};

export const postEvent = async (event: EventPost): Promise<Event> => {
    const response = await axios.post(`${BASE_URL}/events`, event);
    // TODO: To Be tested
    return response.data as Event;
};
