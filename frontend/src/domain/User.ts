export interface User {
    id: string;
    balance: number;
    email: string;
    username: string;
    role: string;
}

export interface Transaction {
    id: string;
    value: number;
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
