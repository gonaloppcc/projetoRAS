export interface Event {
    id: string;
    date: string;
    competition: string;
    participants: Participants;

    completed: boolean;
}

export interface EventPost {
    Sport: string;
    CompetitionId: string;
    Participants: TwoParticipantsPost;
    Date: string;
}

export interface TwoParticipantsPost {
    Home: ParticipantOddPost;
    Away: ParticipantOddPost;
    Tie: TieOdd;
}

export interface ParticipantOddPost {
    Price: number;
    Participant: ParticipantPost;
    Promotion: number | null;
}

export interface ParticipantPost {
    Type: string;
    Name: string;
    Players: Player[];
}

export interface Competition {
    name: string;
    sportId: string;
}

export interface Sport {
    name: string;
}

export interface Participants {
    home: ParticipantOdd;
    away: ParticipantOdd;
    tie: TieOdd;
}

export interface ParticipantOdd {
    id: string;
    participant: Participant;
    score?: number;
}

export interface TieOdd {
    id: string;
    price: number;
    promo: ValuePromo;
}

export interface ValuePromo {
    Value: number;
}

export interface Participant {
    id: string;

    participantName: string;
    price: number;
    promo?: boolean; // FIXME I don't know if this is the correct type
}

export interface Part {
    Name: string;
    Players: Player[];
}

export interface Player {
    Name: string;
}
