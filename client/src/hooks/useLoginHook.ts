import { useMutation, MutationFunction } from "@tanstack/react-query";
import axios from "axios";
import { LoginValues } from "../pages/LoginPage";
type SuccessResponse = {
  data: {
    token: string;
  };
};
const handleLogin: MutationFunction<SuccessResponse, LoginValues> = ({
  emailId,
  password,
}) => {
  return axios.post("http://localhost:8080/auth/signIn", {
    emailId,
    password,
  });
};
interface Error {
  response: {
    data: string;
  };
}

const useLoginHooks = () => {
  return useMutation<SuccessResponse, Error, LoginValues>({
    mutationKey: ["login"],
    mutationFn: handleLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
    },
  });
};

export default useLoginHooks;
