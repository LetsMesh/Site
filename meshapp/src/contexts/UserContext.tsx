import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { apiAxiosInstance } from "../utils/axios/axiosConfig";
import { Account } from "../utils/types/Account";

type LoadingState = "initializing" | "loading" | "completed";

interface AccountContextType {
  account: Account | null;
  updateAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  loadingState: LoadingState;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: React.ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loadingState, setLoadingState] =
    useState<LoadingState>("initializing");

  useEffect(() => {
    setLoadingState("loading");
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
        setLoadingState("completed");
      }
    };

    checkSession();
  }, []);

  return (
    <AccountContext.Provider
      value={{ account, updateAccount: setAccount, loadingState }}
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
