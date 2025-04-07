import { useEffect, useState } from "react";
import { apiClient } from "@/app/config/axiosConfig";
import { WorkDetail } from "../types";

export const useFetchWorks = (
  setWorks: React.Dispatch<React.SetStateAction<WorkDetail[]>>
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.get(`/work`, {
          withCredentials: true,
        });
        const data = response.data.data;
        setWorks(data);
      } catch (error: any) {
        if (error.response?.status === 500) {
          setError(
            "Database is currently unavailable. Please try again later."
          );
        } else {
          setError(
            "Failed to fetch data. Please check your internet connection."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorks();
  }, [setWorks]);

  return { isLoading, error };
};
