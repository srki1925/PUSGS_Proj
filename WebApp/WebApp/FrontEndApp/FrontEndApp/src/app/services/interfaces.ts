export interface IUser{
    FirstName : string,
    LastName : string,
    Email : string,
    Password : string,
    UserType : UserType,
    DoB:Date,
    Blocked : boolean
}

export interface ILoginData{
    Email : string,
    Password : string
}

export interface IConductorRequest{
    FirstName : string,
    LastName : string,
    Email : string,
    Password : string,
    ConfirmPassword : string,
    DoB:Date
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

export interface ILineUpdateRequest{
    Id:number,
    Name:string,
    LineType:LineType
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

export enum DayType{
    WorkDay = 0,
    Saturday = 1,
    Sunday = 2
}

export interface IDepartureRequest{
    Time:string,
    DayType:DayType,
    LineId:number
}

export interface IDeparture{
    Id:number,
    TIme:string,
    DayType:DayType,
    Line:ILine
}

export enum PassengerType{
    Regular = 0,
    Student = 1,
    Retired = 2
}

export interface IRegistrationRequest{
    FirstName:string,
    LastName:string,
    Email:string,
    Password:string,
    ConfirmPassword: string,
    PassengerType:PassengerType,
    EncodedImage:string,
    DoB:Date
}

export interface IActivationData{
    FirstName:string,
    LastName:string,
    Email:string,
    PassengerType:string,
    EncodedImage:string,
    DoB : string,
}

export enum TicketType{
    Hour = 0,
    Day = 1,
    Month = 2,
    Year = 3
}

export interface IPriceListItemRequest{
    TicketType: TicketType,
    Price:number
}

export interface IPriceListItem{
    Id:number,
    TicketDefinition:ITicketDefinition,
}

export interface ITicketDefinition{
    TicketType: TicketType,
    Price:number

}

export interface IPriceListRequest{
    From:Date,
    To:Date,
    PriceListItems:number[]
}

export interface IPriceList{
    Id:number,
    From:Date,
    To:Date,
    PriceListItems:IPriceListItem[]
}
export interface IPriceListUpdateRequest{
    Id:number,
    PriceListItems:number[]
}
export interface ITicketDefinitionResponse{
    Id : number,
    TicketType : string,
    Price : number
}

export interface IScheduleRequest{
    DayType:DayType,
    LineId:number
}

export interface IStationLineRequest{
    LineId:number,
    StationId:number
}
export interface ITicketResponse{
    Id : number,
    TicketType : string,
    IssueDate : Date
}

export interface IRegularTicketRequest{
    Email : string,
    TicketDefinitionId : number
}

export interface IPasswordChangeRequest{
    OldPassword : string,
    NewPassword : string,
    ConfirmPassword : string
}

export interface IUserProfileResponse{
    FirstName : string,
    LastName : string,
    EncodedImage : string,
    UserType : string
    PassengerType : string
}