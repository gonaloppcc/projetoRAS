export interface Event {
    Id: string;
    Date: string;
    Competition: Competition;
    Participants: TwoParticipant;

    Completed: boolean;
}

export interface Competition {
    Id: string;
    Name: string;
    Sport: Sport;
}

export interface Sport {
    Id: string;
    Name: string;
}

export interface TwoParticipant {
    Id: string;
    Home: ParticipantOdd;
    Away: ParticipantOdd;
    Tie?: TieOdd;
}

export interface ParticipantOdd {
    Id: string;
    Participant: Participant;
    Score?: number;
}

export interface TieOdd {}

export interface Participant {
    Id: string;
    Price: number;
    Player: Player[];
    Promo?: boolean; // FIXME I don't know if this is the correct type
    Part: Part;
}

export interface Part {
    Id: string;
    Name: string;
    Players: Player[];
}

export interface Player {
    Id: string;
    Name: string;
}