import { useEffect, useState } from "react";
import { apiClient } from "@/app/config/axiosConfig";
import { WorkDetail } from "../types";

export const useFetchWorks = (
  setWorks: React.Dispatch<React.SetStateAction<WorkDetail[]>>
) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/work`, {
          withCredentials: true,
        });
        const data = response.data.data;
        setWorks(data);
      } catch (error) {
        console.error("Error fetching works:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorks();
  }, [setWorks]);

  return isLoading;
};
