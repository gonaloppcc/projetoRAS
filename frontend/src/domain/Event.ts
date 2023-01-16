export interface Event {
    Id: string;
    Date: string;
    Competition: Competition;
    Participants: TwoParticipant;
    Completed: boolean;
}

export interface EventReceived {
    sportId: string;
    id: string;
    date: string;
    competition: string;
    participants: TwoParticipantReceived;
    completed: boolean;
}

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

export interface TwoParticipantsPost {
    Home: ParticipantOddPost;
    Away: ParticipantOddPost;
    Tie: TieOdd;
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

export interface ParticipantPost {
    Type: string;
    Name: string;
    Players: Player[];
}

export interface CompetitionReceived {
    name: string;
    sport: SportReceived;
}
export interface Competition {
    Name: string;
    Sport: Sport;
}

export interface SportReceived {
    name: string;
}

export interface Sport {
    Name: string;
}

export interface TwoParticipant {
    Id: string;
    Home: ParticipantOdd;
    Away: ParticipantOdd;
    Tie: TieOdd;
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
export interface ParticipantOdd {
    Id: string;
    Participant: Participant;
    Score?: number;
}

export interface TieOddReceived {
    id: string;
    price: number;
    promo: ValuePromo;
}
export interface TieOdd {
    Id?: string;
    Price: number | null;
    Promo: ValuePromo;
}

export interface ValuePromo {
    Value: number;
}

export interface Participant {
    Id: string;
    Price: number;
    Player: Player[];
    Promo?: boolean; // FIXME I don't know if this is the correct type
    Part?: Part;
}

export interface Part {
    Name: string;
    Players: Player[];
}

export interface Player {
    Name: string;
}

// Utilizado no admin/chooseModality
export interface InfoSport {
    name: string;
    competitions: string[];
    teams: string[];
}
