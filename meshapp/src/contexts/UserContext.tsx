import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { apiAxiosInstance } from "../utils/axios/axiosConfig";

interface AccountContextType {
  accountID: number | null;
  updateAccountID: React.Dispatch<React.SetStateAction<number | null>>;
  isLoading: boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [accountID, setAccountID] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await apiAxiosInstance.get("/auth/session/");
        if (response.data.is_logged_in) {
          console.log("logged in account with ID", response.data.accountID);
          setAccountID(response.data.accountID);
        } else {
          setAccountID(null);
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
      value={{ accountID, updateAccountID: setAccountID, isLoading }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within a UserProvider");
  }
  return context;
};
