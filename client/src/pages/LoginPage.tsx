import loginImg from "../assets/LoginImg.svg";
import { useEffect, useState } from "react";
import useLoginHooks from "../hooks/useLoginHook";
import { Link, useNavigate } from "react-router-dom";

export interface LoginValues {
  emailId: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateAsync, isError, error, isSuccess } = useLoginHooks();
  const [loginValues, setLoginValues] = useState<LoginValues>({
    emailId: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(loginValues);
  };
  useEffect(() => {
    if (isError) {
      console.log(error, "err");
      alert(error.response.data);
    }
    if (isSuccess) {
      navigate("/");
    }
  }, [error, isError, isSuccess, navigate]);

  return (
    <main className='h-screen bg-[#F5F5F5] flex justify-center items-center'>
      <div className='flex h-4/5 bg-white w-4/5 rounded-lg'>
        <div className='w-1/2'>
          <div className='flex flex-col justify-center items-center h-full'>
            <h1 className='text-3xl font-bold text-black mb-4'>
              Login to continue
            </h1>
            <form
              className='flex flex-col justify-center items-center w-11/12'
              onSubmit={handleSubmit}
            >
              <input
                name='emailId'
                value={loginValues.emailId}
                onChange={handleChange}
                className='border-2 border-gray-300 rounded-lg px-4 py-2 w-4/5 mb-4 bg bg-[#F5F5F5]'
                type='text'
                placeholder='Email'
              />
              <input
                onChange={handleChange}
                name='password'
                value={loginValues.password}
                className='border-2 border-gray-300 rounded-lg px-4 py-2 w-4/5 mb-4 bg-[#F5F5F5]'
                type='password'
                placeholder='Password'
              />
              <button
                className='bg-[#FD7401] text-white font-bold px-4 py-2 rounded-lg w-4/5 mb-4 border border-solid border-black'
                type='submit'
              >
                Login
              </button>
            </form>
            <Link to='/sign-up' className='text-black'>
              Don't have an account? Register
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

export default LoginPage;
