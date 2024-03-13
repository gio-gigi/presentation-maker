import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Presentation } from "./Presentation";

export enum UserRole {
  ADMIN = "admin",
  VIEWER = "viewer",
}

@Entity()
export class User {
  @PrimaryColumn()
  email!: string;

  @OneToMany(() => Presentation, (presentation) => presentation.user)
  presentations!: Presentation[];

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
