import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Text, Heading, Button, Input, Img } from "../../components";
import FormCoverImg from "../../components/FormCoverImg";
import { baseUrl } from "../../lib/utils";
import { useGoTo } from "../../lib/utils";
import SignInForm from "../../components/SignInForm";
import Loader from "../../components/Loader";

export default function SignIn() {
  const goTo = useGoTo();

  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    passwordEyeOpen: false,
  });

  useEffect(() => {
    checkCompletion();
  }, [formData]);

  const checkCompletion = () => {
    const requiredFields = ["email", "password"];

    const allFilled = requiredFields.every((field) => {
      const value = formData[field];
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return value !== null && value !== undefined;
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
      {loading && <Loader />}
      {/* 
      <div
        className={`flex w-full bg-white-A700 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      > */}
      <SignInForm />

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
