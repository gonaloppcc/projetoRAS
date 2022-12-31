import {InfoSport} from '@domain/Event';
import axios from 'axios';
import {BASE_URL} from './constants';

export const getSports = async (): Promise<InfoSport[]> => {
    const response = await axios.get(`${BASE_URL}/sports`);
    return response.data as InfoSport[];
};
