import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { apiAxiosInstance } from "../utils/axios/axiosConfig";

interface AccountSettings {
  isVerified: boolean;
  hasContentFilterEnabled: boolean;
  displayTheme: string;
  is2FAEnabled: boolean;
}

interface Account {
  accountID: number;
  email: string;
  phoneNum: string;
  isMentor: boolean;
  isMentee: boolean;
  settings?: AccountSettings;
}

interface AccountContextType {
  account: Account | null;
  updateAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  isLoading: boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: React.ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await apiAxiosInstance.get("/auth/session/");
        if (response.data.is_logged_in) {
          setAccount(response.data.account);
        } else {
          setAccount(null);
        }
      } catch (error) {
        console.error("Session check failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AccountContext.Provider
      value={{ account, updateAccount: setAccount, isLoading }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
};
