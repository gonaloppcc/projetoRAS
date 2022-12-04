import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getEvents = async ({
    sportId,
    pageNum = 0,
    pageSize = 10,
}: {
    sportId: string;
    pageNum?: number;
    pageSize?: number;
}): Promise<Event[]> => {
    const response = await axios.get(`${BASE_URL}/events`, {
        params: {sportId, pageNum, pageSize},
    });
    return response.data as Event[];
};

export const getEvent = async (eventId: string): Promise<Event> => {
    console.log(`${BASE_URL}/events/${eventId}`);
    const response = await axios.get(`${BASE_URL}/events/${eventId}`);
    return response.data as Event;
};
