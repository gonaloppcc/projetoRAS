export type Bet = SimpleBet | MultipleBet;

export interface SimpleBet {
    id: string;
    odd: ParticipantOdd;
    eventId: string;
    date: string;
    closed: boolean;
    betterId: string;
    amount: number;
}

export interface MultipleBet {
    id: string;
    closed: boolean;
    date: string;
    betterId: string;
    odds: MultiBetOdd[];
    amount: number;
}

export interface MultiBetOdd {
    eventId: string;
    odd: ParticipantOdd;
}

export interface ParticipantOdd {
    type: string;
    id: string;
    participantName: string; // Name of the participant
    price: number;
    //Promo?: boolean;
}
