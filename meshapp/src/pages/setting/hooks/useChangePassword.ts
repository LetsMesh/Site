import { useAccountContext } from "../../../contexts/UserContext";
import { apiAxiosInstance } from "../../../utils/axios/axiosConfig";
import { toast } from "react-toastify";
import { LoadingState } from "../../../utils/types/loading";
import { useState } from "react";

export const useChangePassword = () => {
  const { account } = useAccountContext();
  const [loadingState, setLoadingState] =
    useState<LoadingState>("initializing");

  const changePassword = async (oldPassword: String, newPassword: String) => {
    if (!account) {
      toast.error("User not found.");
      return false;
    }

    try {
      setLoadingState("loading");
      const response = await apiAxiosInstance.patch(
        "/accounts/change-password/",
        {
          email: account.email,
          old_password: oldPassword,
          new_password: newPassword,
        }
      );

      if (response.status === 204) {
        toast.success("Password successfully changed.");
        return true;
      }
    } catch (error) {
      toast.error("Invalid old password.");
      return false;
    } finally {
      setLoadingState("completed");
    }
  };

  return { loadingState, changePassword };
};
