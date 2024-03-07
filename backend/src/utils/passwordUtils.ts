import bcrypt from "bcryptjs";

export const comparePwd = async (dbPwd: string, userPwd: string): Promise<boolean> => {
  const ans: boolean = await bcrypt.compare(userPwd, dbPwd);
  return ans;
};

export const hashPwd = async (pwd: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt(10);
  const hashedPwd: string = await bcrypt.hash(pwd, salt);
  return hashedPwd;
};
