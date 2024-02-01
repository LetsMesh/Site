// src/components/MessageBar/hooks/useFetchConversations.tsx

import { useEffect, useState } from "react";
import { Conversation } from "../types/Conversation";
import { apiAxiosInstance } from "../axios/axiosConfig";
import { useAccountContext } from "../../contexts/UserContext";

const useFetchConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { account } = useAccountContext();
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await apiAxiosInstance.get(`/conversations/`);
        setConversations(response.data.conversations);
      } catch (err) {
        setError("Failed to load conversations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [account]);

  return { conversations, isLoading, error };
};

export default useFetchConversations;
