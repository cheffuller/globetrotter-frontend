export interface UserAccount {
    id: number;
    address: string;
    city: string;
    country: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
}

export interface UserAccountCreation {
    address: string;
    city: string;
    country: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
}

export interface UserProfile {
    accountId?: number;
    bio: string;
    displayName: string;
    isPrivate: boolean;
}