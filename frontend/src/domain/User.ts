export interface User {
    id: string;
    balance: number;
    email: string;
    username: string;
    type: string;
}

export enum UserType {
    Admin = 'Administrator',
    Better = 'Better',
    Specialist = 'Specialist',
}

export interface Transaction {
    id: string;
    value: number;
    date: string;

    balanceAfter: number;
    type: string;
}

export interface Specialist {
    Email: string;
    Username: string;
    Password: string;
    Specialties: SportSpecialist[];
}

export interface SportSpecialist {
    SportId: string;
}

export interface Notification {
    id: string;
    date: string;
    message: string;
    severity: string;
}
