import { UserRole } from "../../constants/roles";

export interface UserEntity {
    name?: string;
    email: string;
    role: UserRole;
}

export interface LoggedInUser {
    user: UserEntity;
    token: string;
}

export interface UserInfo {
    name?: string;
    email: string;
}