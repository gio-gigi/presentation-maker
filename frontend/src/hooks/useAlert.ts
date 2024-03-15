import { useState } from "react";

export const useAlert = () => {
  const [isHelpVisible, setIsHelpVisible] = useState<boolean>(false);

  const handleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };
  const closeHelp = () => {
    setIsHelpVisible(false);
  };
  return { isHelpVisible, handleHelp, closeHelp };
};
