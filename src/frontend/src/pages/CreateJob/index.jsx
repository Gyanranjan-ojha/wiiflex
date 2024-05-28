import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Input, Img, Heading, Text } from "../../components";
import { useFormContext } from "context/FormContextProvider";
import { useNavigate } from "react-router-dom";

export default function CreateJobPage() {
  const { formData, updateFormData } = useFormContext();
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next page
    navigate("/createjob1");
  };

  const handleInputChange = (e) => {
    console.log("name, value:", e.target.name, e.target.value);
    updateFormData(e.target.name, e.target.value);
    checkCompletion();
  };

  const checkCompletion = () => {
    // Check if all the required fields are filled
    const requiredFields = [
      "companyName",
      "companySize",
      "yourName",
      "phone",
      "companyCity",
      "companyState",
      "companyCountry",
      "companyStreetAddress",
      "jobCity",
      "jobState",
      "jobCountry",
      "jobStreetAddress",
    ];
    const allFilled = requiredFields.every((field) => {
      const value = formData[field];
      return value && value.trim() !== "";
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
      <div className="flex w-full items-center justify-between gap-5 bg-white-A700 pr-[259px] md:flex-col md:pr-5">
        <div className="flex w-[58%] flex-col items-start justify-center gap-28 bg-blue-100 pb-[323px] pl-[33px] pt-6 md:w-full md:gap-[84px] md:p-5 md:pb-5 sm:gap-14 sm:py-5 sm:pl-5">
          <Heading
            size="6xl"
            as="h1"
            className="ml-[157px] !text-white-A700 md:ml-0"
          >
            Connect. Merge. Work
          </Heading>
          <Img
            src="images/img_abstraction.png"
            alt="abstraction"
            className="h-[685px] w-[69%] self-center object-cover"
          />
        </div>
        <div className="mb-[61px] w-[35%] self-end md:w-full">
          <div className="flex-col items-start">
            <Heading size="3xl" as="h2" className="!text-teal-900">
              Post a job
            </Heading>
            <div className="mt-[22px] flex items-center gap-[25px]">
              <Heading
                size="xl"
                as="h3"
                className="text-light_blue-700 whitespace-nowrap"
              >
                Company Details
              </Heading>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Job Details
              </Text>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Candidate Requirements
              </Text>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Job Description
              </Text>
            </div>
            <div className="h-px w-[25%] bg-light_blue-700" />
            <div className="mt-[38px] flex w-[62%] flex-col gap-[15px] md:w-full md:p-5">
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder={`Your Company Name`}
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                ABC Tech Consulting
              </Input>
              <Input
                name="companySize"
                placeholder={`Company Size`}
                value={formData.companySize}
                onChange={handleInputChange}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                How Many Employees?
              </Input>
              <Input
                type="text"
                name="yourName"
                placeholder={`Your Name`}
                value={formData.yourName}
                onChange={handleInputChange}
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              ></Input>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={`Phone `}
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                (+91)
              </Input>
            </div>
            <Heading as="h6" className="mt-[35px]">
              Company Location
            </Heading>
            <div className="mt-[13px] flex w-[62%] flex-col items-start gap-[13px] md:w-full md:p-5">
              <div className="flex gap-2.5 self-stretch">
                <Input
                  name="companyCity"
                  placeholder={`City`}
                  value={formData.companyCity}
                  onChange={handleInputChange}
                  // suffix={
                  //   <Img
                  //     src="images/img_keyboard_arrow_down.svg"
                  //     alt="keyboard_arrow_down - material"
                  //     className="h-[20px] w-[15px]"
                  //   />
                  // }
                  className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                >
                  HYD
                </Input>
                <Input
                  name="companyState"
                  placeholder={`State`}
                  value={formData.companyState}
                  onChange={handleInputChange}
                  // suffix={
                  //   <Img
                  //     src="images/img_keyboard_arrow_down.svg"
                  //     alt="keyboard_arrow_down - material"
                  //     className="h-[20px] w-[15px]"
                  //   />
                  // }
                  className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                >
                  TG
                </Input>
              </div>
              <Input
                name="companyCountry"
                placeholder={`Country`}
                value={formData.companyCountry}
                onChange={handleInputChange}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] w-[48%] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                India
              </Input>
              <Input
                name="companyStreetAddress"
                placeholder={`Company Street Address`}
                value={formData.companyStreetAddress}
                onChange={handleInputChange}
                className="h-[70px] self-stretch rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                123 Hitech City, Hyderabad, 500082
              </Input>
            </div>
            <Heading as="p" className="mt-6">
              Job Location
            </Heading>
            <div className="mt-6 flex w-[42%] flex-col items-start md:w-full md:p-5">
              <div className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-light_blue-700 bg-white-A700" />
              <div className="relative mt-[-20px] flex items-center gap-1.5">
                <Img
                  src="images/img_checkmark.svg"
                  alt="checkmark"
                  className="h-[19px] w-[19px] self-start"
                />
                <div className="flex">
                  <Heading size="lg" as="p" className="!text-light_blue-700">
                    Same as Company Location
                  </Heading>
                </div>
              </div>
            </div>
            <div className="mt-[19px] flex w-[62%] gap-[9px] md:w-full md:p-5">
              <Input
                name="jobCity"
                placeholder={`City`}
                value={formData.jobCity}
                onChange={handleInputChange}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                HYD
              </Input>
              <Input
                name="jobState"
                placeholder={`State`}
                value={formData.jobState}
                onChange={handleInputChange}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                TG
              </Input>
            </div>
            <Input
              name="jobCountry"
              placeholder={`Country`}
              value={formData.jobCountry}
              onChange={handleInputChange}
              // suffix={
              //   <Img
              //     src="images/img_keyboard_arrow_down.svg"
              //     alt="keyboard_arrow_down - material"
              //     className="h-[20px] w-[15px]"
              //   />
              // }
              className="mt-[15px] h-[70px] w-[30%] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            >
              India
            </Input>
            <Input
              name="jobStreetAddress"
              placeholder={`Company Street Address`}
              value={formData.jobStreetAddress}
              onChange={handleInputChange}
              className="mt-[15px] h-[70px] w-[62%] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            >
              123 Hitech City, Hyderabad, 500082
            </Input>
            <Link to="/createjob1">
              <Button
                size="xl"
                shape="round"
                className="mt-[11px] min-w-[360px] font-bold sm:px-5"
                // disabled={!isComplete}
                onClick={handleNext}
              >
                Next
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
