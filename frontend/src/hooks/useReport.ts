import create from 'zustand';
import {Odd} from '../types/Event';

interface BetState {
    eventId: string;
    eventName: string;
    odd: Odd;
}

interface ReportState {
    bets: BetState[];

    // Handlers
    addBet: (bet: BetState) => void;
    removeBet: (id: string) => void;
}

const initialBets: BetState[] = [
    {
        eventId: '1',
        eventName: 'Liverpool - Porto',
        odd: {
            name: 'Resultado Final: Liverpool',
            price: 1.5,
        },
    },
];

export const useReport = create<ReportState>((set) => ({
    bets: initialBets,
    addBet: (bet) => set((state) => ({bets: [...state.bets, bet]})),
    removeBet: (id) =>
        set((state) => {
            const index = state.bets.findIndex((bet) => bet.eventId === id);
            if (index === -1) {
                return {bets: state.bets};
            }
            const newBets = [...state.bets];
            newBets.splice(index, 1);

            return {bets: newBets};
        }),
}));
