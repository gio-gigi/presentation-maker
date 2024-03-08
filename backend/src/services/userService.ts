import { User, UserRole } from "../models/User";
import { AppDataSource } from "../config/data-source";

const UserRepository = AppDataSource.getRepository(User);

export const userExists = async (email: string): Promise<boolean> => {
  const user: User | null = await UserRepository.findOneBy({ email });
  return user ? true : false;
};

export const getUserRole = async (email: string): Promise<UserRole | null> => {
  const user: User | null = await UserRepository.findOneBy({ email });
  if (user) {
    return user.role;
  }
  return null;
};
