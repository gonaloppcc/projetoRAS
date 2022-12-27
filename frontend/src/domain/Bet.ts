import {Event} from '@domain/Event';

export type Bet = SimpleBet | MultipleBet;

export interface SimpleBet {
    Id: string;
    Odd: Odd;
    Event: Event;
    Date: string;
    Closed: boolean;
    BetterId: string;
    Amount: number;
}

export interface MultipleBet {
    Id: string;
    Closed: boolean;
    Date: string;
    BetterId: string;
    Odds: MultiBetOdd[];
    Amount: number;
}

export interface MultiBetOdd {
    Event: Event;
    Odd: Odd;
}

export interface Odd {
    Id: string;
    PartId: string; // Name of the participant
    Price: number;
    //Promo?: boolean;
}
