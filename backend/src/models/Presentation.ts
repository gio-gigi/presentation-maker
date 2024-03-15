import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Presentation {
  @PrimaryGeneratedColumn()
  idPresentation!: number;

  @ManyToOne(() => User, (user) => user.presentations)
  user!: User;

  @Column()
  title!: string;

  @Column()
  txtName!: string;

  @Column("date")
  creationDate: Date = new Date();

  @Column()
  imageName: string = "default.jpg";
}
