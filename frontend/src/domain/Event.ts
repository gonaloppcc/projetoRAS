export interface Event {
    Id: string;
    Date: string;
    Competition: Competition;
    Participants: TwoParticipant;
    Completed: boolean;
}

export interface EventMini {
    id: string;
    date: string;
    competition: CompetitionMini;
    participants: TwoParticipantMini;
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

export interface ParticipantOddPost {
    Price: number;
    Participant: ParticipantPost;
    Promotion: number | null;
    score?: number;
}

export interface ParticipantPost {
    Type: string;
    Name: string;
    Players: Player[];
}

export interface CompetitionMini {
    name: string;
    sport: SportMini;
}
export interface Competition {
    Name: string;
    Sport: Sport;
}

export interface SportMini {
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
export interface TwoParticipantMini {
    id: string;
    home: ParticipantInfoMini;
    away: ParticipantInfoMini;
    tie: TieOddMini;
}

export interface ParticipantInfoMini {
    participant: ParticipantOddMini;
    score?: number;
}

export interface ParticipantOddMini {
    id: string;
    participantName: ParticipantMini;
    price: number;
    score?: number;
}
export interface ParticipantOdd {
    Id: string;
    Participant: Participant;
    Score?: number;
}

export interface TieOddMini {
    Id?: string;
    Price: number;
    Promo: ValuePromoMini;
}
export interface TieOdd {
    Id?: string;
    Price: number;
    Promo: ValuePromo;
}

export interface ValuePromoMini {
    Value: number;
}
export interface ValuePromo {
    Value: number;
}
export interface ParticipantMini {
    id: string;
    price: number;
    Player: Player[];
    Promo?: boolean; // FIXME I don't know if this is the correct type
    Part?: Part;
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
