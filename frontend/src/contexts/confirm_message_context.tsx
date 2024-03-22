import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserEntity } from "../infrastructure/entities/user";
import axios from "axios";
import { UserRole } from "../constants/roles";
import { set } from "react-hook-form";

type MessageContextType = {
    isVisible: boolean;
    message: string;
    showMessage: (message: string) => void;
    hideMessage: () => void;
};

const MessageContext = createContext<MessageContextType>({
    isVisible: false,
    message: "",
    showMessage: () => {},
    hideMessage: () => {}
});

type MessageContextProviderProps = {
  children: ReactNode;
};

export const MessageContextProvider = ({ children }: MessageContextProviderProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const showMessage = (message: string) => {
        setIsVisible(true);
        setMessage(message);
        setTimeout(() => {
            setIsVisible(false);
            setMessage("");
        }, 3000);
    };
    const hideMessage = () => {
        setIsVisible(false);
        setMessage("");
    };
    const value = { isVisible, message, showMessage, hideMessage };
  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

export const useConfirmMessage = () => {
  if (MessageContext === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return useContext(MessageContext);
};
