import { Photo } from './photo';

export interface User {
    id: number;
    age: number;
    username: string;
    gender: string;
    dateOfBirth: Date;
    knownAs: string;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    photoUrl: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    photos?: Photo[];
}
