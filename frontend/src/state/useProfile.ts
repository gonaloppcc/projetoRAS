import create from 'zustand';
import {User} from '@domain/User';
import {addBalance, login} from '../services/backend/user';

export interface ProfileState extends User {
    // Handlers
    login: (email: string, password: string) => Promise<void>;
    setProfile: (id: string) => void;
    setBalance: (balance: number) => void;
    deposit: (amount: number) => Promise<void>;
    withdraw: (amount: number) => Promise<void>;

    isLogged: boolean;
}

export const useProfile = create<ProfileState>((set, get) => ({
    id: '',
    balance: 0,
    email: '',
    username: '',
    role: '',
    isLogged: false,
    login: async (email, password) => {
        const user = await login(email, password);

        set((state) => {
            return {...state, ...user, isLogged: true};
        });
    },
    setProfile: (id) => {},

    setBalance: (balance) => {
        set((state) => {
            return {...state, balance: balance};
        });
    },
    deposit: async (amount) => {
        const balance = await addBalance(get().id, amount);
        set((state) => {
            return {...state, balance};
        });
    },
    withdraw: async (amount) => {
        const balance = await addBalance(get().id, -amount);
        set((state) => {
            return {...state, balance};
        });
    },
}));
