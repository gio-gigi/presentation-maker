export enum UserRole {
  ADMIN = "admin",
  VIEWER = "viewer",
}


export const ADMIN_ROLES = [UserRole.ADMIN];
export const VIEWER_ROLES = [UserRole.VIEWER, UserRole.ADMIN];