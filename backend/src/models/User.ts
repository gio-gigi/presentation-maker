import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  admin!: boolean;
}
