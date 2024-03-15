import { v4 as uuidv4 } from "uuid";
export const uniqueFileName = (extension: string) => {
  return `${Date.now()}-${uuidv4()}${extension}`;
};
