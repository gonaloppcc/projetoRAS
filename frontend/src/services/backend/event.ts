import {ValuePromo, TieOdd} from '@domain/Event';
import axios from 'axios';
import {BASE_URL} from './constants';

export interface EventToPost {
    CompetitionId: string;
    Date: string;
    Completed: boolean;
    Participants: TwoParticipantsPost;
}

export interface EventPost {
    Sport: string;
    Event: EventToPost;
}

export interface ParticipantMesmo {
    Price: number | null;
    Promo: number | null;
    PartId: string;
}
export interface ParticipantOddPost {
    Participant: ParticipantMesmo;
    Score: number;
}
export interface TwoParticipantsPost {
    Home: ParticipantOddPost;
    Away: ParticipantOddPost;
    Tie: TieOdd;
}

export interface EventReceived {
    sportId: string;
    id: string;
    date: string;
    competition: string;
    participants: TwoParticipantReceived;
    completed: boolean;
}
export interface TwoParticipantReceived {
    home: ParticipantInfoReceived;
    away: ParticipantInfoReceived;
    tie: TieOddReceived;
}

export interface ParticipantInfoReceived {
    participant: ParticipantOddReceived;
    score?: number;
}

export interface ParticipantOddReceived {
    id: string;
    participantName: string;
    price: number;
    score?: number;
}

export interface TieOddReceived {
    id: string;
    price: number;
    promo: ValuePromo;
}

export const getEventsByCompetition = async ({
    competitionId,
    pageNum = 0,
    pageSize = 20,
}: {
    competitionId: string;
    pageNum?: number;
    pageSize?: number;
}): Promise<Event[]> => {
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
}): Promise<EventReceived[]> => {
    const response = await axios.get(`${BASE_URL}/events/sport`, {
        params: {sportId, pageNum, pageSize},
    });
    return response.data;
};

export const getEvent = async (eventId: string): Promise<Event> => {
    const response = await axios.get(`${BASE_URL}/events/${eventId}`);
    return response.data as Event;
};

export const postEvent = async (event: EventPost): Promise<Event> => {
    const response = await axios.post(`${BASE_URL}/events`, event);
    return response.data as Event;
};

export const putEvent = async (
    event: EventPost,
    idGame: string
): Promise<Event> => {
    const response = await axios.put(`${BASE_URL}/events/${idGame}`, event);
    return response.data as Event;
};
