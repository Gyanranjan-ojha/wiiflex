import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Button, Img, Heading, SelectBox, Input } from "../../components";
import axios from "axios";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function Signup1Page() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    if (!e || !e.target) {
      console.error("Event or target is undefined", e);
      return;
    }

    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/accounts/register/", {
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 201) {
        setSuccess("User created successfully.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Internal server error.");
      } else {
        setError("Internal server error.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full justify-center bg-gray-100 pl-[18px]">
        <div className="relative mx-auto h-[718px] w-full max-w-[1133px]">
          <div className="absolute bottom-0 right-[-0.43px] top-0 my-auto flex h-max w-[66%] justify-center rounded-bl-[38px] rounded-tl-[38px] bg-white-A700 px-14 pb-[116px] pt-[301px] md:p-5">
            <div className="flex w-[64%] justify-center md:w-full">
              <form className="flex w-full flex-col items-start" onSubmit={handleSubmit}>
                <Input
                  color="gray_200_04"
                  size="xs"
                  variant="underline"
                  shape="square"
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="self-stretch sm:pr-5"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <Input
                  color="gray_200_04"
                  size="xs"
                  variant="underline"
                  shape="square"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="mt-9 self-stretch sm:pr-5"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  color="gray_200_04"
                  size="xs"
                  variant="underline"
                  shape="square"
                  type="password"
                  name="password"
                  placeholder="Password"
                  suffix={
                    <div className="flex h-[16px] w-[25px] items-center justify-center">
                      <Img src="images/img_eye.svg" alt="eye" className="h-[16px] w-[25px]" />
                    </div>
                  }
                  className="mt-[37px] gap-[35px] self-stretch pl-px"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Input
                  color="gray_200_04"
                  size="xs"
                  variant="underline"
                  shape="square"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="mt-[37px] gap-[35px] self-stretch pl-px"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {error && <Text color="red" size="lg" as="p" className="mt-4">{error}</Text>}
                {success && <Text color="green" size="lg" as="p" className="mt-4">{success}</Text>}
                <Button color="teal_200" size="xl" className="mt-[39px] w-full rounded-[9px] font-bold sm:px-5" type="submit">
                  Create Account
                </Button>
                <Text size="lg" as="p" className="mt-[18px] !text-gray-500_05">
                  <span className="text-gray-500_05">Already have an account?&nbsp;</span>
                  <span className="text-teal-200">Log in&nbsp;</span>
                </Text>
              </form>
            </div>
          </div>
          <Img
            src="images/img_abstraction.png"
            alt="abstraction"
            className="absolute bottom-[-108.22px] left-[0.00px] m-auto h-[555px] w-[46%] object-cover"
          />
          <header className="absolute left-0 right-0 top-[20.50px] m-auto flex w-[96%] flex-col items-start gap-8">
            <div className="flex items-left justify-between gap-5 self-stretch">
              <Img src="images/img_header_logo.png" alt="headerlogo" className="h-[37px] w-[87px] object-contain" />
              <SelectBox
                size="xs"
                shape="square"
                indicator={<Img src="images/img_polygon_1.svg" alt="polygon 1" className="h-[12px] w-[17px]" />}
                name="englishuk"
                placeholder="English (UK)"
                options={dropDownOptions}
                className="mb-1.5 w-[10%] gap-px self-end tracking-[0.56px] text-gray-500_06 sm:pr-5"
                />
              </div>
              <div className="flex w-[90%] items-start justify-between gap-5 md:w-full md:flex-col">
                <Heading
                  size="5xl"
                  as="h2"
                  className="w-[37%] !font-dmsans leading-[41px] tracking-[1.28px] !text-black-900 md:w-full"
                >
                  Your One-Stop solution for hiring and lending resources!
                </Heading>
                <div className="mt-[13px] flex w-[42%] flex-col items-center md:w-full">
                  <Heading size="4xl" as="h4" className="self-start tracking-[1.00px] !text-black-900">
                    Create Account
                  </Heading>
                  <div className="mt-[21px] flex gap-[25px] self-stretch">
                    <Button
                      color="white_A700"
                      size="2xl"
                      leftIcon={<Img src="images/img_search_1.png" alt="search 1" className="h-[25px] w-[25px]" />}
                      className="w-full gap-3.5 rounded-[9px] border border-solid border-gray-200_04 !text-black-900"
                    >
                      Sign up with Google{" "}
                    </Button>
                    <Button
                      color="white_A700"
                      size="2xl"
                      leftIcon={<Img src="images/img_linkedin_1.png" alt="linkedin 1" className="h-[25px] w-[25px]" />}
                      className="w-full gap-2.5 rounded-[9px] border border-solid border-gray-200_04 !text-black-900"
                    >
                      Sign up with LinkedIn
                    </Button>
                  </div>
                  <Text size="xl" as="p" className="mt-[35px] !text-gray-500_04">
                    - OR -
                  </Text>
                </div>
              </div>
            </header>
          </div>
        </div>
      </>
    );
  }