import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Text, Heading, Button, Input, Img } from "../../components";
import FormCoverImg from "../../components/FormCoverImg";
import { baseUrl } from "../../lib/utils";
import { useGoTo } from "../../lib/utils";
import { useUserDetails } from "../../context/UserContextProvider";

export default function SignUpPage() {
  const goTo = useGoTo();
  const { updateUserDetails } = useUserDetails();

  const [isComplete, setIsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    showPassword: false,
    showConfirmPassword: false,
    passwordEyeOpen: false,
    confirmPasswordEyeOpen: false,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    checkCompletion();
  };

  const togglePasswordVisibility = (field, eyeField) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
      [eyeField]: !prevData[eyeField],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !formData.companyName ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.agreeTerms
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate password and confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords does not match.");
      return;
    }

    try {
      const requestData = {
        company_name: formData.companyName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      };

      if (formData.agreeTerms) {
        requestData.agree_terms = true;
      }
      setShowModal(true);
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/accounts/register/`,
        requestData
      );

      console.log("responsee:", response);
      if (response.status === 201) {
        // alert("Account created successfully.");
        localStorage.setItem("firstName", formData.firstName);
        localStorage.setItem("lastName", formData.lastName);
        localStorage.setItem("companyName", formData.companyName);
        localStorage.setItem("email", formData.email);
        setError("");

        // Clear form data after successful submission
        setFormData({
          companyName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeTerms: false,
          showPassword: false,
          showConfirmPassword: false,
          passwordEyeOpen: false,
          confirmPasswordEyeOpen: false,
        });

        // goTo("/verify-email");
        goTo("/welcome/123");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Internal server error.");
      } else {
        setError("Something went wrong! please try again.");
      }
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
  };

  useEffect(() => {
    checkCompletion();
  }, [formData]);

  const checkCompletion = () => {
    const requiredFields = [
      "companyName",
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "agreeTerms",
    ];

    const allFilled = requiredFields.every((field) => {
      const value = formData[field];

      if (typeof value === "string") {
        return value.trim() !== "";
      } else {
        if (field === "agreeTerms" && !value) return value;

        return value !== null && value !== undefined;
      }
    });
    setIsComplete(allFilled);
  };

  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex w-full bg-white-A700">
        <div className="flex w-full items-center justify-start md:w-full md:flex-col md:p-5">
          <FormCoverImg />
          <div className="flex w-1/2 flex-col items-center self-start mb-2 md:w-full">
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
                Sign Up
              </Heading>
              <form
                onSubmit={handleSubmit}
                className="mt-3 flex flex-col items-center self-stretch"
              >
                <div className="flex flex-col gap-4 self-stretch">
                  {success && (
                    <Text as="p" className="text-green-500">
                      {success}
                    </Text>
                  )}
                  {error && (
                    <Text as="p" className="text-red-500">
                      {error}
                    </Text>
                  )}
                  <Input
                    type="text"
                    name="companyName"
                    placeholder="Your Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                    inputClassName="font-bold"
                  />
                  <div className="flex gap-2.5">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                      inputClassName="font-bold"
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                      inputClassName="font-bold"
                    />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-[0.5px] border-gray-200_03 pl-[13px] pr-[35px] text-sm font-bold !bg-transparent text-cyan-900 sm:pr-5"
                    inputClassName="font-bold"
                  />
                  <Input
                    type={formData.showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password "
                    value={formData.password}
                    onChange={handleChange}
                    suffix={
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility(
                            "showPassword",
                            "passwordEyeOpen"
                          )
                        }
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
                    className="h-[70px] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-3 text-xs font-bold bg-transparent text-cyan-900 sm:pr-5"
                  />
                  <Input
                    type={formData.showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password "
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    suffix={
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          togglePasswordVisibility(
                            "showConfirmPassword",
                            "confirmPasswordEyeOpen"
                          )
                        }
                      >
                        <Img
                          src={
                            formData.showConfirmPassword
                              ? "/images/hide_password.png"
                              : "/images/show_password.png"
                          }
                          alt="eye"
                          className="h-[20px] w-[20px]"
                        />
                      </span>
                    }
                    className="gap-px border-[0.5px] border-gray-200_03 pl-3.5 pr-3 text-xs font-bold bg-transparent text-cyan-900 sm:pr-5"
                  />
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700"
                    />
                    <Text as="p" className="flex flex-col">
                      <span className="w-full leading-[21px] text-gray-500_01">
                        I have read and agree to WIIFLEX's
                      </span>
                      <span className="w-full leading-[21px] flex flex-wrap items-center">
                        <a
                          href="#"
                          className="text-light_blue-700 underline mr-1"
                        >
                          Privacy Policy
                        </a>
                        <span className="text-light_blue-700 mr-1">,</span>
                        <a
                          href="#"
                          className="text-light_blue-700 underline mr-1"
                        >
                          Terms of Use
                        </a>
                        <span className="text-light_blue-700 mr-1">and</span>
                        <a href="#" className="text-light_blue-700 underline">
                          Cookies Policy
                        </a>
                      </span>
                    </Text>
                  </div>
                </div>
                <Button
                  size="xl"
                  shape="round"
                  className={`mt-6 w-full h-[38px] rounded-lg font-bold transition-transform duration-300 hover:scale-105 sm:px-5 ${
                    isComplete
                      ? "bg-light_blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isComplete}
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
                  Create Your Account
                </Button>
                <div className="mt-6 flex flex-col items-center gap-1 px-[11px] pt-[11px]">
                  <a href="#">
                    <Text as="p" className="!text-gray-800_02">
                      Already have an account?
                    </Text>
                  </a>

                  <Heading
                    size="lg"
                    as="h3"
                    className="!text-light_blue-700 cursor-pointer"
                    onClick={() => goTo(`/sign-in`)}
                  >
                    Sign in
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
      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-40">
          <div className="w-[35%] flex flex-col justify-evenly max-w-lg p-5 h-1/4 mx-auto bg-white-A700 rounded-lg shadow-lg transform transition-all">
            {loading ? (
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-900">
                  Creating your account...
                </h3>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h3 className="text-xl font-medium text-gray-900">
                    Account Created Successfully!
                  </h3>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={closeModalAndNavigate}
                    className="px-4 py-2 text-sm font-medium text-white bg-light_blue-700 rounded-md"
                  >
                    Okay
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )} */}
    </>
  );
}
