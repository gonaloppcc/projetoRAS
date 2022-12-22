export interface User {
    Id: string;
    Nif: string;
    Cc: string;
    Cellphone: string;
    Balance: number;
    Email: string;
    Username: string;
    Password: string;

    TransactionHist: Transaction[];
}

export interface Transaction {
    Id: string;
    Value: number;
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
