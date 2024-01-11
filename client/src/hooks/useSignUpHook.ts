import {
  useMutation,
  MutationFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";
import { SignUpValues } from "../pages/SignUpPage";

const handleSignUp: MutationFunction<unknown, SignUpValues> = ({
  emailId,
  password,
}) => {
  return axios.post("http://localhost:8080/auth/signUp", {
    emailId,
    password,
  });
};
interface Error {
  response: {
    data: string;
  };
}
const useSignUp: () => UseMutationResult<
  unknown,
  Error,
  SignUpValues,
  unknown
> = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: handleSignUp,
  });
};

export default useSignUp;

// :UseMutationResult<any,Error>
