import { Entity, Column, PrimaryColumn } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  VIEWER = "viewer",
}

@Entity()
export class User {
  @PrimaryColumn()
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.VIEWER,
  })
  role: UserRole = UserRole.VIEWER;
}
