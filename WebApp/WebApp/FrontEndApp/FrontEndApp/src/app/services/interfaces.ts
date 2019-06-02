export interface IUser{
    FirstName : string,
    LastName : string,
    Email : string,
    Password : string,
    UserType : UserType,
    Blocked : boolean
}

export enum UserType{
    Administrator = 0,
    Passenger = 1,
    Conductor = 2
}