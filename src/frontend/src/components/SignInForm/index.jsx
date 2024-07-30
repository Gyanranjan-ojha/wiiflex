import React, { useEffect, useRef, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl, signInSchema, useGoTo } from "../../lib/utils";
import { useSignInForm } from "../../context/SignInProvider";
import { Button, Input, Text, Heading, Img } from "../../components";
import FormCoverImg from "../FormCoverImg";
import axios from "axios";

const SignInForm = () => {
  const goTo = useGoTo();
  const { formData, handleChange, togglePasswordVisibility, loading } =
    useSignInForm();
  const formRef = useRef(null);
  const [error, setError] = useState("");

  const defaultValues = useMemo(
    () => ({
      email: formData.email,
      password: formData.password,
    }),
    [formData]
  );

  const {
    register,
    handleSubmit: handleFormSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const formValues = watch();

  const onSubmit = async (data) => {
    // Perform the API call here
    setError("");
    try {
      const response = await axios.post(`${baseUrl}/accounts/login/`, data);
      if (response.status === 200) {
        localStorage.setItem("email", data.email);
        goTo("/all-jobs");
      } else {
        console.error("Login failed with status:", response.status);
      }
    } catch (err) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex w-full bg-white-A700">
      <div className="flex w-full items-center justify-start md:w-full md:flex-col md:p-5">
        <FormCoverImg />
        <div className="flex w-1/2 flex-col items-center self-start md:w-full">
          <div className="flex flex-col items-center justify-center w-[63%] pl-[5%] pt-[51px]">
            <Img
              src="/images/img_wiiflex_softwar.png"
              alt="wiiflexsoftwar"
              className="h-[50px] w-[40%] object-cover"
            />
            <Heading
              size="xl"
              as="h2"
              className="!font-semibold !text-gray-800_02 mt-2"
            >
              Sign In
            </Heading>
            <form
              onSubmit={handleFormSubmit(onSubmit)}
              className="mt-3 flex flex-col items-center self-stretch"
            >
              <div className="flex flex-col gap-4 self-stretch">
                {error && <span className="text-red-500">{error}</span>}
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
                <Input
                  id="password"
                  type={formData.showPassword ? "text" : "password"}
                  {...register("password")}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  suffix={
                    <span
                      className="cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <Img
                        src={
                          formData.passwordEyeOpen
                            ? "/images/hide_password.png"
                            : "/images/show_password.png"
                        }
                        alt="eye"
                        className="h-[20px] w-[20px]"
                      />
                    </span>
                  }
                  className="border p-2"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
                <Text as="p" className="flex flex-col ml-[30px]">
                  <span className="w-full leading-[21px] text-light_blue-700 cursor-pointer">
                    Forgot Password ?
                  </span>
                </Text>
              </div>
              <Button
                size="xl"
                shape="round"
                className={`mt-6 w-full h-[38px] rounded-lg font-bold transition-transform duration-300 hover:scale-105 sm:px-5 ${
                  errors.email || errors.password
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-light_blue-700"
                }`}
                disabled={!!errors.email || !!errors.password}
                type="submit"
              >
                {loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="mr-3 -ml-1 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Sign In
              </Button>
              <div className="mt-6 flex flex-col items-center gap-1 px-[11px] pt-[11px]">
                <Text as="p" className="!text-gray-800_02">
                  Don't have an account?
                </Text>
                <Heading
                  size="lg"
                  as="h3"
                  className="!text-light_blue-700 cursor-pointer"
                  onClick={() => goTo(`/sign-up`)}
                >
                  Sign Up
                </Heading>
                <div className="flex">
                  <Text
                    size="xs"
                    as="p"
                    className="!text-gray-800_02 leading-[18px]"
                  >
                    © 2024 WIIFLEX, LLC.
                  </Text>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
