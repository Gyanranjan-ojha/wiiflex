import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Text, Heading, Button, Img } from "../../components";
import FormCoverImg from "../../components/FormCoverImg";
import { baseUrl, useGoTo } from "../../lib/utils";

export default function WelcomePage() {
  const goTo = useGoTo();

  const [isComplete, setIsComplete] = useState(false);
  const { token } = useParams();

  console.log("Token from URL:", token);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${baseUrl}/accounts/verify_email/${token}/`;
        console.log("API URL:", apiUrl);
        const response = await axios.get(apiUrl);
        console.log("check status successfully:", response);
      } catch (error) {
        console.error("Verification error:", error);
      }
    };

    fetchData();
  }, [token]);

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
          <div className="mb-[50px] flex w-1/2 flex-col items-center self-center md:w-full">
            <div className="flex flex-col items-center justify-center w-[63%] pl-[5%]">
              <Img
                src="/images/img_wiiflex_softwar.png"
                alt="wiiflexsoftwar"
                className="h-[50px] w-[40%] object-cover"
              />

              <Heading
                size="lg"
                as="h3"
                className="!text-light_blue-700 text-center my-8"
              >
                Welcome{" "}
              </Heading>

              <Heading
                size="xl"
                as="h2"
                className="!font-semibold !text-gray-800_02"
              >
                To continue you have to:
              </Heading>
              <div className="flex flex-col items-center self-stretch">
                <div className="mt-[14px] w-full flex flex-col items-center justify-between gap-[15px] md:w-full">
                  <Button
                    size="xl"
                    shape="round"
                    className="!bg-white-A700 !text-light_blue-700 border-[1px] border-light_blue-700 min-w-[246px] font-bold transition-transform duration-300 hover:scale-105 sm:px-5"
                    onClick={() => goTo("/all-jobs")}
                  >
                    Go To Homepage
                  </Button>
                  <Button
                    size="xl"
                    shape="round"
                    className="min-w-[246px] font-bold transition-transform duration-300 hover:scale-105 sm:px-5"
                    onClick={() => goTo("/jobs/create/company-details")}
                  >
                    Post a job
                  </Button>
                </div>
                <div className="!mt-4 flex">
                  <Text size="xs" as="p" className="!text-gray-800_02">
                    © 2024 WIIFLEX, LLC.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
