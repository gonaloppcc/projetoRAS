import axios from 'axios';

const BASE_URL = 'http://localhost:3001/events';

export const getEvents = async ({
    sportId,
    pageNum = 0,
    pageSize = 10,
}: {
    sportId: string;
    pageNum?: number;
    pageSize?: number;
}): Promise<Event[]> => {
    pageNum = pageNum ?? 0;
    pageSize = pageSize ?? 20;

    const response = await axios.get(`${BASE_URL}/events`, {
        params: {sportId, pageNum, pageSize},
    });
    return response.data as Event[];
};
