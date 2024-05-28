import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Button,
  Radio,
  RadioGroup,
  Text,
  Input,
  Img,
  Heading,
} from "../../components";
import { useFormContext } from "context/FormContextProvider";
import { useNavigate } from "react-router-dom";

// import Header from "../../components/Header";

export default function CreateJob1Page() {
  const { formData, updateFormData } = useFormContext();
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next page
    navigate("/createjob2");
  };

  const handleInputChange = (e) => {
    updateFormData(e.target.name, e.target.value);
    checkCompletion();
  };

  const checkCompletion = () => {
    // Add your validation logic here to set `isComplete` as true or false
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
        <div className="flex w-[87%] items-center justify-between gap-5 md:w-full md:flex-col md:p-5">
          <div className="flex w-[58%] flex-col items-start justify-center gap-[336px] bg-blue-100 pb-[481px] pl-[169px] pr-14 pt-[188px] md:w-full md:gap-[252px] md:p-5 sm:gap-[168px]">
            <Heading
              size="6xl"
              as="h1"
              className="ml-[41px] !text-white-A700 md:ml-0"
            >
              Connect. Merge. Work
            </Heading>
            <Img
              src="images/img_abstraction.png"
              alt="abstraction"
              className="h-[685px] w-[87%] object-cover"
            />
          </div>
          <div className="mb-[49px] flex w-[35%] flex-col items-start self-end md:w-full">
            {/* <div>
            <Header />
          </div> */}
            <Heading size="3xl" as="h2" className="!text-teal-900">
              Post a job
            </Heading>
            <div className="mt-[22px] flex items-center gap-[25px]">
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Company Details
              </Text>
              <Heading
                size="xl"
                as="h3"
                className="text-light_blue-700 whitespace-nowrap"
              >
                Job Details
              </Heading>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Candidate Requirements
              </Text>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Job Description
              </Text>
            </div>
            <div className="h-px w-[25%] bg-light_blue-700" />
            <Input
              name="lookingfora"
              placeholder={`Job Title`}
              className="mt-[30px] h-[70px] w-[62%] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            >
              Sr. Python Developer
            </Input>
            <Text as="p" className="mt-[29px] !text-cyan-900">
              What Type of Job is it?
            </Text>
            <RadioGroup name="whattypeof" className="mt-[18px] flex flex-col">
              <Radio
                value="fulltime"
                label="Full-Time"
                className="mr-6 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="parttime"
                label="Part-Time"
                className="mr-[19px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="temporary"
                label="Temporary"
                className="mr-3 mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="contract"
                label="Contract"
                className="mr-[26px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="internship"
                label="Internship"
                className="mr-[19px] mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="commission"
                label="Commission"
                className="mt-5 flex-1 gap-2 p-px text-sm text-cyan-900"
              />
            </RadioGroup>
            <Input
              name="duration"
              placeholder={`Experience Required?`}
              // suffix={
              //   <Img
              //     src="images/img_keyboard_arrow_down.svg"
              //     alt="keyboard_arrow_down - material"
              //     className="h-[20px] w-[15px]"
              //   />
              // }
              className="mt-[23px] h-[70px] w-[62%] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            >
              5 Years
            </Input>
            <Text as="p" className="mt-[13px] !text-cyan-900">
              What is the Pay for this Job?
            </Text>
            <div className="mt-[18px] flex w-[62%] flex-col gap-[15px] md:w-full">
              <div className="flex gap-2.5">
                <Input
                  name="price"
                  placeholder={`From \$`}
                  // suffix={
                  //   <Img
                  //     src="images/img_keyboard_arrow_down.svg"
                  //     alt="keyboard_arrow_down - material"
                  //     className="h-[20px] w-[15px]"
                  //   />
                  // }
                  className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                >
                  80,000{" "}
                </Input>
                <Input
                  name="price"
                  placeholder={`To \$`}
                  // suffix={
                  //   <Img
                  //     src="images/img_keyboard_arrow_down.svg"
                  //     alt="keyboard_arrow_down - material"
                  //     className="h-[20px] w-[15px]"
                  //   />
                  // }
                  className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                >
                  1,20,000
                </Input>
              </div>
              <Input
                name="perhour"
                placeholder={`Contract Type`}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                Per Month
              </Input>
            </div>
            <div className="mt-[23px] flex w-[58%] flex-col gap-[15px] md:w-full">
              <Text as="p" className="leading-6 !text-cyan-900">
                <>
                  Are there Any Additional Form of Compensation <br />
                  Offered?
                </>
              </Text>
              <RadioGroup name="arethereany" className="flex flex-col">
                <Radio
                  value="tips"
                  label="Tips"
                  className="mr-[79px] flex-1 gap-2 p-px text-sm font-bold text-light_blue-700 md:mr-0"
                />
                <Radio
                  value="commission1"
                  label="Commission"
                  className="mr-5 mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="bonuses"
                  label="Bonuses"
                  className="mr-[50px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="storediscounts"
                  label="Store Discounts"
                  className="mt-5 flex-1 gap-2 text-sm text-cyan-900"
                />
                <Radio
                  value="otherforms"
                  label="Other Forms"
                  className="mr-[23px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                />
              </RadioGroup>
            </div>
            <Text as="p" className="mt-[30px] !text-cyan-900">
              Are Any of the Following Benefits Offered?
            </Text>
            <RadioGroup name="areanyofthe" className="mt-[18px] flex flex-col">
              <Radio
                value="healthinsurance"
                label="Health Insurance"
                className="mr-[30px] flex-1 gap-2 text-sm font-bold text-light_blue-700 md:mr-0"
              />
              <Radio
                value="dentalinsurance"
                label="Dental Insurance"
                className="mr-[35px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="visioninsurance"
                label="Vision Insurance"
                className="mr-[39px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="retirementplan"
                label="Retirement Plan"
                className="mr-[43px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="signingbonus"
                label="Signing Bonus"
                className="mr-[55px] mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="paidtimeoff"
                label="Paid Time off"
                className="mr-[63px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="workfromhome"
                label="Work From Home"
                className="mr-[34px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="flexibleschedule"
                label="Flexible Schedule"
                className="mr-[34px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="parentalleave"
                label="Parental Leave"
                className="mr-[51px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
              />
              <Radio
                value="relocationassistance"
                label="Relocation Assistance"
                className="mt-5 flex-1 gap-2 text-sm text-cyan-900"
              />
            </RadioGroup>
            <Link to="/createjob2">
              <Button
                size="xl"
                shape="round"
                className="mt-[23px] min-w-[360px] font-bold sm:px-5"
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
