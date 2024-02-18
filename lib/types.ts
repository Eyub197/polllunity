export interface AuthData {
    email : string,
    password: string
}

export type actions = "login" | "signup" | "signout"