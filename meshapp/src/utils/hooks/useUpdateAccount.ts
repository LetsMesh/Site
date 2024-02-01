import { useState } from "react";

import { AccountSettings } from "../types/Account";
import { apiAxiosInstance } from "../axios/axiosConfig";

export const useUpdateAccountSetting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAccount = async (
    accountID: number,
    newSettings: Partial<AccountSettings>
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiAxiosInstance.patch(
        `/account-settings/${accountID}/`,
        newSettings
      );
      return response;
    } catch (error: any) {
      setError(error.message || "Unknown error occurred");
      //   console.error("Error updating account settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateAccount, isLoading, error };
};
