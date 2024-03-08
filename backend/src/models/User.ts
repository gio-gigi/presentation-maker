import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  admin!: boolean;
}
