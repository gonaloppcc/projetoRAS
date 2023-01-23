import create from 'zustand';
import {User} from '@domain/User';
import {addBalance, login} from '../services/backend/user';

const SESSION_DURATION = 1000 * 60 * 60 * 2;

export interface ProfileState extends User {
    // Handlers
    getSession: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setProfile: (id: string) => void;
    setBalance: (balance: number) => void;
    deposit: (amount: number) => Promise<void>;
    withdraw: (amount: number) => Promise<void>;
    refresh: () => Promise<void>;

    isLoggedIn: boolean;
}

export const useProfile = create<ProfileState>((set, get) => ({
    id: '0',
    balance: 0,
    email: '',
    username: '',
    role: '',
    isLoggedIn: false,
    getSession: async () => {
        const userId = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        const expiration = localStorage.getItem('expiration');

        if (!userId || !password || !expiration) {
            // No session
            return;
        }

        const now = new Date().getTime();
        if (now < Number(expiration)) {
            try {
                await get().login(userId, password);
                return;
            } catch (_) {}
        }
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('expiration');
    },
    login: async (email, password) => {
        const user = await login(email, password);

        set((state) => {
            return {...state, ...user, isLoggedIn: true};
        });

        const expiration = Date.now() + SESSION_DURATION;
        localStorage.setItem('email', user.email);
        localStorage.setItem('password', password); // FIXME: This is not secure
        localStorage.setItem('expiration', String(expiration));
    },
    logout: () => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('expiration');
        set((state) => {
            return {...state, isLoggedIn: false};
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
    refresh: async () => {
        const user = await login(
            get().email,
            localStorage.getItem('password') as string
        );
        set((state) => {
            return {...state, ...user, isLoggedIn: true};
        });
    },
}));
