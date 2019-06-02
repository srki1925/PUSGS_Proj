export interface IUser{
    FirstName : string,
    LastName : string,
    Email : string,
    Password : string,
    UserType : UserType,
    Blocked : boolean
}

export interface IConductorRequest{
    FirstName : string,
    LastName : string,
    Email : string,
    Password : string
}

export enum UserType{
    Administrator = 0,
    Passenger = 1,
    Conductor = 2
}