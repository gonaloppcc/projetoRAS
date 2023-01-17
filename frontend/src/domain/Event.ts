export interface Event {
    Id: string;
    Date: string;
    Competition: Competition;
    Participants: TwoParticipant;
    Completed: boolean;
}

export interface Competition {
    Name: string;
    Sport: Sport;
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

export interface ParticipantOdd {
    Id: string;
    Participant: Participant;
    Score?: number;
}

export interface ValuePromo {
    Value: number;
}

export interface TieOdd {
    Id?: string;
    Price: number | null;
    Promo: ValuePromo;
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
