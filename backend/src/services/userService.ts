import { User } from "../models/User";
import { AppDataSource } from "../config/data-source";
import { IUser } from "../interfaces/IUser";

const UserRepository = AppDataSource.getRepository(User);

export const userExists = async (email: string): Promise<boolean> => {
  const user: IUser | null = await UserRepository.findOneBy({ email });
  return user ? true : false;
};
