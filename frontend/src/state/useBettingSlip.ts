import create from 'zustand';
import {v4 as uuidv4} from 'uuid';
import {
    addMultipleBet,
    AddMultipleBetProps,
    addSimpleBet,
    AddSimpleBetProps,
} from '../services/backend/bet';
import {Odd} from '@domain/Bet';

export enum Currency {
    EUR = '€',
    USD = '$',
}

export enum BetType {
    Simple,
    Multiple,
}

export interface BetState {
    id: string;
    eventId: string;
    eventName: string;
    eventType: string;
    odd: Odd;
    bettingAmount?: number; // Undefined when betType is Multiple
}

export type BetWithNoId = Omit<BetState, 'id'>;

interface ReportState {
    currency?: Currency;
    bets: BetState[];
    betType: BetType;
    bettingAmount?: number; // Undefined when betType is Single

    // Handlers
    addBet: (bet: BetWithNoId) => void;
    removeBet: (id: string) => void;
    setBetAmount: (id: string, amount: number) => void;

    setBetType: (betType: BetType) => void;

    setBettingAmount: (bettingAmount: number) => void;

    submitReport: (betterId: string) => Promise<void>;
}

const initialBets: BetState[] = [];

const initialBetType: BetType = BetType.Simple;

export const useBettingSlip = create<ReportState>((set, get) => ({
    currency: Currency.EUR /* FIXME: Currency is hardcoded for now! */,
    bettingAmount: 0,
    bets: initialBets,
    betType: initialBetType,
    addBet: (bet) =>
        set((state) => {
            if (state.betType === BetType.Simple) {
                bet = {
                    ...bet,
                    bettingAmount: 0, // Initial betting amount is 0
                };
            }
            return {bets: [...state.bets, {id: uuidv4(), ...bet}]};
        }),
    setBetAmount: (id, amount) => {
        set((state) => {
            const index = state.bets.findIndex((bet) => bet.id === id);
            if (index === -1) {
                return {bets: state.bets};
            }
            const newBets = [...state.bets];
            newBets[index].bettingAmount = amount;

            return {bets: newBets};
        });
    },
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

    setBettingAmount: (bettingAmount: number) => set({bettingAmount}),

    submitReport: async (betterId) => {
        const {bets, betType, bettingAmount} = get();
        switch (betType) {
            case BetType.Simple:
                const simpleBet: AddSimpleBetProps = {
                    oddId: bets[0].odd.id,
                    betterId: betterId,
                    amount: bets[0].bettingAmount as number,
                };

                await addSimpleBet(simpleBet);

                break;
            case BetType.Multiple:
                // TODO: Implement MultiBet logic

                const multipleBet: AddMultipleBetProps = {
                    betterId: betterId,
                    amount: bettingAmount as number,
                    oddIds: bets.map((bet) => bet.odd.id),
                };

                await addMultipleBet(multipleBet);

                break;
            default:
                break;
        }

        set(({betType, bets}) => {
            return {bets: []}; // Just clearing the bets
        });
    },
}));
