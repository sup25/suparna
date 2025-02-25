import { useEffect } from "react";
import { apiClient } from "@/app/config/axiosConfig";
import { WorkDetail } from "../types";

export const useFetchWorks = (
  setWorks: React.Dispatch<React.SetStateAction<WorkDetail[]>>
) => {
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await apiClient.get(`/work`, {
          withCredentials: true,
        });
        const data = response.data.data;
        setWorks(data);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };
    fetchWorks();
  }, [setWorks]);
};
