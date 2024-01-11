import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config";

const addTask = async (taskName: string) => {
  try {
    const res = await axios.post(
      `${API_URL}/task/addTask`,
      { taskName },
      {
        headers: {
          Authorization:
            localStorage.getItem("token") !== null
              ? localStorage.getItem("token")
              : "",
        },
      }
    );
    return res.data;
  } catch (error) {
    return [];
  }
};

const useAddTaskHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries("getTask" as InvalidateQueryFilters);
    },
  });
};
export default useAddTaskHook;
