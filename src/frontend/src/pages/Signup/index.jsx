import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Text, Heading, Button, Input, Img } from "../../components";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function SignupPage() {
  const navigate = useNavigate(); // Initialize useNavigate

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
      setError("Passwords do not match.");
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

      const response = await axios.post("http://127.0.0.1:8000/api/accounts/register/", requestData);

      if (response.status === 201) {
        setSuccess("Account created successfully.");
        localStorage.setItem('firstName', formData.firstName);
        localStorage.setItem('lastName', formData.lastName);
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

        // Navigate to homepage after successful creation
        navigate("/homepage");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Internal server error.");
      } else {
        setError("Internal server error.");
      }
      setSuccess("");
    }
  };

  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full bg-white-A700">
        <div className="flex w-[85%] items-center justify-between gap-5 md:w-full md:flex-col md:p-5">
          <div className="flex w-[59%] flex-col items-start justify-center gap-[74px] bg-blue-100 pb-[116px] pl-[169px] pr-14 pt-[140px] md:w-full md:gap-[55px] md:p-5 sm:gap-[37px]">
            <Heading size="6xl" as="h1" className="ml-[21px] !text-white-A700 md:ml-0">
              Connect. Merge. Work
            </Heading>
            <Img src="images/img_abstraction.png" alt="abstraction" className="h-[685px] w-[87%] object-cover" />
          </div>
          <div className="mb-[50px] flex w-[22%] flex-col items-center self-end md:w-full">
            <Img src="images/img_wiiflex_softwar.png" alt="wiiflexsoftwar" className="h-[50px] w-[40%] object-cover" />
            <a href="#" className="mt-[9px]">
              <Heading size="xl" as="h2" className="!font-semibold !text-gray-800_02">
                Sign Up
              </Heading>
            </a>
            <form onSubmit={handleSubmit} className="mt-[26px] flex flex-col items-center self-stretch">
              <div className="flex flex-col gap-4 self-stretch">
                {success && <Text as="p" className="text-green-500">{success}</Text>}
                {error && <Text as="p" className="text-red-500">{error}</Text>}
                <Input
                  type="text"
                  name="companyName"
                  placeholder="Your Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                />
                <div className="flex gap-2.5">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-[70px] w-full rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-[70px] w-full rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                  />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-[13px] pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
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
                        togglePasswordVisibility("showPassword", "passwordEyeOpen")
                      }
                    >
                      <Img
                        src={
                          formData.passwordEyeOpen
                            ? "images/img_eye_open.svg"
                            : "images/img_eye_close.svg"
                        }
                        alt="eye"
                        className="h-[16px] w-[25px]"
                      />
                    </span>
                  }
                  className="h-[70px] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-xs text-cyan-900_66 sm:pr-5"
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
                          formData.confirmPasswordEyeOpen
                            ? "images/img_eye_open.svg"
                            : "images/img_eye_close.svg"
                        }
                        alt="eye"
                        className="h-[16px] w-[25px]"
                      />
                    </span>
                  }
                  className="h-[70px] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-xs text-cyan-900_66 sm:pr-5"
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
                      <a href="#" className="text-light_blue-700 underline">
                        Privacy Policy
                      </a>
                      <span className="text-light_blue-700">, </span>
                      <a href="#" className="text-light_blue-700 underline">
                        Terms of Use
                      </a>
                      <span className="text-light_blue-700">, </span>
                      <a href="#" className="text-light_blue-700 underline">
                        Cookies Policy
                      </a>
                    </span>
                  </Text>
                </div>
              </div>
              <Button size="xl" shape="round" className="mt-[25px] w-full font-bold sm:px-5" type="submit">
                Create Your Account
              </Button>
              <div className="mt-[34px] flex flex-col items-center gap-4 px-[11px] pb-[7px] pt-[11px]">
                <a href="#">
                  <Text as="p" className="!text-gray-800_02">
                    Already have an account?
                  </Text>
                </a>
                <a href="#">
                  <Heading size="lg" as="h3" className="!text-light_blue-700">
                    Sign in
                  </Heading>
                </a>
              </div>
              <div className="mt-[46px] flex">
                <Text size="xs" as="p" className="!text-gray-800_02">
                  © 2024 WIIFLEX, LLC.
                </Text>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
