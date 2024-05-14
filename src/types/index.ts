export interface IUser {
    email: string;
    name: string;
    uuid: string;
    description: string;
    age: number;
}

export interface IGame {
    uuid: string;
    name: string;
    localisation : string;
    nbPlayerLimit : number;
    startingAt : string;
    level : 'tout niveau'|'debutant'|'occasionnel'| 'amateur'| 'habituer';
    organizer : IUser;
    users : IUser[];
    ground : IGround;
}

export interface IGround {
    uuid: string;
    name: string;
    localisation : string;
    image : string;
    games : IGame[];
}