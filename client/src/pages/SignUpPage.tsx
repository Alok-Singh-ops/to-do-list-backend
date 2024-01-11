import loginImg from "../assets/LoginImg.svg";
import { useEffect, useState } from "react";
import useSignUp from "../hooks/useSignUpHook";
import { Link, useNavigate } from "react-router-dom";
export interface SignUpValues {
  emailId: string;
  password: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const { mutateAsync, isSuccess, isError, error } = useSignUp();

  const [signUpValues, setLoginValues] = useState<SignUpValues>({
    emailId: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(signUpValues);
  };
  useEffect(() => {
    if (isSuccess) {
      alert("Sign Up Successful. Please Login to continue");
      navigate("/login");
    }
    if (isError) {
      console.log(error);
      alert(error.response.data);
    }
  }, [isSuccess, isError, error, navigate]);

  return (
    <main className='h-screen bg-[#F5F5F5] flex justify-center items-center'>
      <div className='flex h-4/5 bg-white w-4/5 rounded-lg'>
        <div className='w-1/2'>
          <div className='flex flex-col justify-center items-center h-full'>
            <h1 className='text-3xl font-bold text-black mb-4'>
              Sign Up to continue
            </h1>
            <form
              className='flex flex-col justify-center items-center w-11/12'
              onSubmit={handleSubmit}
            >
              <input
                name='emailId'
                value={signUpValues.emailId}
                onChange={handleChange}
                className='border-2 border-gray-300 rounded-lg px-4 py-2 w-4/5 mb-4 bg bg-[#F5F5F5]'
                type='text'
                placeholder='Email'
              />
              <input
                onChange={handleChange}
                name='password'
                value={signUpValues.password}
                className='border-2 border-gray-300 rounded-lg px-4 py-2 w-4/5 mb-4 bg-[#F5F5F5]'
                type='password'
                placeholder='Password'
              />
              <button
                className='bg-[#FD7401] text-white font-bold px-4 py-2 rounded-lg w-4/5 mb-4 border border-solid border-black'
                type='submit'
              >
                Sign Up
              </button>
            </form>
            <Link to='/login' className='text-black'>
              Already have an account?{" "}
              <span
                className='text-[#FD7401] cursor-pointer'
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </Link>
          </div>
        </div>
        <div className='w-1/2'>
          <img src={loginImg} className='m-auto h-full' />
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
