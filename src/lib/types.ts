export interface IUser {
    id:string
    name: string
    surname: string
    login: string
    password: string
    isPrivate: boolean
    cover: string
    picture: string
}

export type InputUser = Omit<IUser, 'id' | 'isPrivate' | 'cover' | 'picture'>

export type InputUserLogin = Pick<IUser, "login" | "password">


export interface IResponse {
    status:string
    message?:string
    payload?: unknown
    user?:IWideUser
}

export interface IWideUser extends IUser {
    followers: IUser[]
    following: IUser[]
}

export interface IContextType {
    account: IWideUser,
    setAccount: (user:IWideUser) => void
}

export enum Tab {
    Profile = 'profile',
    ChangePassword = 'changePassword',
    ChangeLogin = 'changeLogin'
}

export interface InputUpdate {
    old?: string
    newpwd?: string
    login?: string
    password?: string
}

export interface IPost {
    id:number
    title:string
    picture:string
}

interface IConnection {
    blockedMe: boolean
    didIBlock: boolean
    following: boolean
    followsMe: boolean
    requested: boolean
}

export interface IAccount extends IUser {
    available:boolean
    connection: IConnection
    posts: IPost[]
    followers: []
    following: []
}