// src/components/MessageBar/hooks/useFetchConversations.tsx

import { useEffect, useState } from "react";
import { Conversation } from "src/models/conversation";
import { axiosInstance } from "src/config/axios-config";
import { useAccountContext } from "src/contexts/UserContext";

const useFetchConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { account, loadingState } = useAccountContext();
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get(
          `/accounts/${account?.accountID}/conversations/`
        );
        setConversations(response.data.conversations);
      } catch (err) {
        setError("Failed to load conversations");
      } finally {
        setIsLoading(false);
      }
    };
    if (loadingState === "completed") {
      if (account) {
        fetchConversations();
      } else {
        setConversations([]);
      }
    }
  }, [account, loadingState]);

  return { conversations, isLoading, error };
};

export default useFetchConversations;
