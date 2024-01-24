// hooks/useLogin.ts
import { useState } from "react";
import { apiAxiosInstance } from "../axios/axiosConfig";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email: String, password: String) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiAxiosInstance.post("/auth/login/", {
        email: email,
        password: password,
      });

      setIsLoading(false);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, error };
};
