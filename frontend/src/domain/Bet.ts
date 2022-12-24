import {Event} from '@domain/Event';

export interface Bet {
    Id: string;
    Odd: Odd;
    Event: Event;
    Date: string;
    Closed: boolean;
    BetterId: string;
    Amount: number;
}

export interface Odd {
    Id: string;
    PartId: string; // Name of the participant
    Price: number;
    //Promo?: boolean;
}
