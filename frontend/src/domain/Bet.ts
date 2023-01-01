import {Event} from '@domain/Event';

export type Bet = SimpleBet | MultipleBet;

export interface SimpleBet {
    id: string;
    oddId: string;
    event: Event;
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
    //event: Event;
    oddId: string;
}

export interface Odd {
    id: string;
    partId: string; // Name of the participant
    price: number;
    //Promo?: boolean;
}
