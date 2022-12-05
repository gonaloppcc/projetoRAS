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
