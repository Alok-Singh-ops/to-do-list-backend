import {
  InvalidateQueryFilters,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const deleteTask = async (taskId: string) => {
  try {
    const res = await axios.delete(`http://localhost:8080/task/deleteTask`, {
      data: {
        taskId,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (error) {
    return [];
  }
};

const useDeleteTaskHook = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries("getTask" as InvalidateQueryFilters);
    },
  });
};

export default useDeleteTaskHook;
