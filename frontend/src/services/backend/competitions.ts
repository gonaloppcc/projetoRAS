import {Competition} from '@domain/Event';
import {BASE_URL} from './constants';
import axios from 'axios';

export const getCompetitions = async (
    sportId: string
): Promise<Competition[]> => {
    const response = await axios.get(
        `${BASE_URL}/competitions?sportId=${sportId}`
    );
    return response.data as Competition[];
};
