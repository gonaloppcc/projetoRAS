import create from 'zustand';
import {Odd} from '../types/Event';
import {v4 as uuidv4} from 'uuid';

export type BetType = 'Simple' | 'Multiple';

export interface BetState {
    id: string;
    eventId: string;
    eventName: string;
    odd: Odd;
}

export type BetWithNoId = Omit<BetState, 'id'>;

interface ReportState {
    bets: BetState[];
    betType: BetType;

    // Handlers
    addBet: (bet: BetWithNoId) => void;
    removeBet: (id: string) => void;
    setBetType: (betType: BetType) => void;

    submitReport: () => void;
}

const initialBets: BetState[] = [
    {
        id: uuidv4(),
        eventId: '1',
        eventName: 'Liverpool - Porto',
        odd: {
            name: 'Resultado Final: Liverpool',
            price: 1.5,
        },
    },
];

const initialBetType: BetType = 'Simple';

export const useReport = create<ReportState>((set) => ({
    bets: initialBets,
    betType: initialBetType,
    addBet: (bet) =>
        set((state) => ({bets: [...state.bets, {id: uuidv4(), ...bet}]})),
    removeBet: (id) =>
        set((state) => {
            const index = state.bets.findIndex((bet) => bet.id === id);
            if (index === -1) {
                return {bets: state.bets};
            }
            const newBets = [...state.bets];
            newBets.splice(index, 1);

            return {bets: newBets};
        }),
    setBetType: (betType: BetType) => set({betType}),

    submitReport: async () =>
        set(() => {
            // TODO: Connect to backend

            return {bets: []}; // Just clearing the bets for now
        }),
}));
