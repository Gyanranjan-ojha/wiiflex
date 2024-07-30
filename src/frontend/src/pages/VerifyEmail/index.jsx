import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Text, Heading, Button, Input, Img } from "../../components";
import FormCoverImg from "../../components/FormCoverImg";
import { baseUrl, useGoTo } from "../../lib/utils";

export default function VerifyEmailPage() {
  const goTo = useGoTo();

  const [isComplete, setIsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userEmail = localStorage.getItem("email");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const response = await axios.post(
        `${baseUrl}/accounts/register/`,
        requestData
      );

      if (response.status === 201) {
        setSuccess("Account created successfully.");
        localStorage.setItem("firstName", formData.firstName);
        localStorage.setItem("lastName", formData.lastName);
        localStorage.setItem("email", formData.email);
        setError("");

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

        goTo("/jobs/create/company-details");
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

  const closeModalAndNavigate = () => {
    setShowModal(false);
    goTo("/welcome");
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
          <div className="mb-2 flex w-1/2 flex-col items-center self-center md:w-full">
            <div className="flex flex-col items-center justify-center w-[63%] pl-[5%]">
              <Img
                src="/images/img_wiiflex_softwar.png"
                alt="wiiflexsoftwar"
                className="h-[50px] w-[40%] object-cover"
              />
              <Heading
                size="xl"
                as="h2"
                className="!font-semibold !text-gray-800_02 my-8"
              >
                Verify Email
              </Heading>
              <div className="mb-4 p-4 ">
                <Text as="p" className="mb-2 font-medium !text-cyan-900">
                  We have sent a verification email to
                </Text>
                <Heading
                  size="lg"
                  as="h3"
                  className="!text-light_blue-700 text-center"
                >
                  {userEmail}
                </Heading>
                <Text as="p" className="mt-[22px] !text-cyan-900">
                  Please verify your email to continue...
                </Text>
              </div>
              <form
                onSubmit={handleSubmit}
                className="mt-[26px] flex flex-col items-center self-stretch"
              >
                <div className="flex flex-col items-center gap-4 px-[11px] pb-[7px] pt-[11px]">
                  <a href="#">
                    <Text as="p" className="!text-gray-800_02">
                      Did not get the verification Email?
                    </Text>
                  </a>
                  <a href="#">
                    <Heading size="lg" as="h3" className="!text-light_blue-700">
                      Resend verification Email
                    </Heading>
                  </a>
                </div>
                <div className="mt-4 flex">
                  <Text size="xs" as="p" className="!text-gray-800_02">
                    © 2024 WIIFLEX, LLC.
                  </Text>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-40">
          <div className="w-[35%] flex flex-col justify-evenly max-w-lg p-5 h-1/4 mx-auto bg-white-A700 rounded-lg shadow-lg transform transition-all">
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
          </div>
        </div>
      )}
    </>
  );
}
