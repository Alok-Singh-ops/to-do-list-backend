import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config";

export interface Task {
  taskId: string;
  taskName: string;
  isCompleted: boolean;
}

const getTask = async () => {
  try {
    const res = await axios.get(`${API_URL}/task/getTask`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (error) {
    return [];
  }
};

const useGetTaskHook = () => {
  return useQuery({
    queryKey: ["getTask"],
    queryFn: getTask,
    initialData: [],
  });
};

export default useGetTaskHook;
