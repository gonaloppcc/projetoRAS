import {NextApiRequest, NextApiResponse} from 'next';

const API_URL = 'http://ucras.di.uminho.pt/';

const API_EVENTS_ENDPOINT = `${API_URL}v1/games/`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch(API_EVENTS_ENDPOINT, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });

    const data = await response.json();

    res.status(200).json(data);
};
