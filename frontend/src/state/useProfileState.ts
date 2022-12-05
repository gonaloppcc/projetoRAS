import create from 'zustand';
import {User} from '@domain/User';
import {login} from '../services/backend/user';

export interface ProfileState extends User {
    // Handlers
    login: (email: string, password: string) => void;
    setProfile: (id: string) => void;
    setBalance: (balance: number) => void;
}

export const useProfileState = create<ProfileState>((set) => ({
    Id: '',
    Nif: '',
    Cc: '',
    Cellphone: '',
    Balance: 0,
    Email: '',
    Username: '',
    Password: '',
    TransactionHist: [],
    login: async (email, password) => {
        const user = await login(email, password);
        set((state) => {
            return {...state, ...user};
        });
    },
    setProfile: (id) => {},

    setBalance: (balance) => {
        set((state) => {
            return {...state, Balance: balance};
        });
    },
}));
