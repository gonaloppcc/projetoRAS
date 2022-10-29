export interface Event {
    id: string;
    awayTeam: string;
    bookmakers: Bookmaker[];
    commenceTime: string;
    completed: boolean;
    homeTeam: string;
    scores: string;
}

export interface Bookmaker {
    key: string;
    lastUpdate: string;
    markets: Market[];
}

export interface Market {
    key: string;
    outcomes: Odd[];
}

export interface Odd {
    name: string;
    price: number;
}
