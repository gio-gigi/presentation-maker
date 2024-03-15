import fs from "fs";
export const createTxtWIthContent = (content: string, path: string) => {
  console.log("path", path);
  fs.writeFileSync(path, content);
};

export const readTxt = async (path: string): Promise<string> => {
  return await fs.readFileSync(path, "utf-8");
};
