export interface Bet {
    Id: string;
    Odd: Odd;
    EventId: string;
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
