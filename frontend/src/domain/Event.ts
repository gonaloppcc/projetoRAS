import {Value} from 'classnames';

export interface Event {
    Id: string;
    Date: string;
    Competition: Competition;
    Participants: TwoParticipant;

    Completed: boolean;
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
    Tie?: TieOdd;
}

export interface ParticipantOdd {
    Id: string;
    Participant: Participant;
    Score?: number;
}

export interface TieOdd {
    Price: number;
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
