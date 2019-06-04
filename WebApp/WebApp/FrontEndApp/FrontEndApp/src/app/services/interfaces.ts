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

export interface ILineRequest{
    Name:string,
    LineType: LineType,
}

export interface ILine{
    Id:number,
    Name:string,
    LineType: LineType,
    Active:boolean
}

export enum LineType{
    City = 0,
    Outskirts = 1
}

export interface IBusStation{
    Id:number,
    Name:string,
    Address:string,
    Longitude:string,
    Latitude:string,
    Active:boolean
}

export interface IBusStationRequest{
    Name:string,
    Address:string,
    Longitude:string,
    Latitude:string
}