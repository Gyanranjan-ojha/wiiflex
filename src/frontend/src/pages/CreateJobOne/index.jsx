import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Button,
  Radio,
  RadioGroup,
  Text,
  Input,
  Heading,
  CheckBox,
  SelectBox,
} from "../../components";
import { useFormContext } from "../../context/FormContextProvider";
import FormCoverImg from "../../components/FormCoverImg";
import ErrorBoundary from "../../components/ErrorBoundry";
import { useGoTo } from "../../lib/utils";
import { useUserDetails } from "../../context/UserContextProvider";

const experienceOptions = [
  { label: "Fresher", value: "0" },
  { label: "1 year", value: "1" },
  { label: "2 years", value: "2" },
  { label: "3 years", value: "3" },
  { label: "4 years", value: "4" },
  { label: "5 years", value: "5" },
  { label: "> 5 years", value: "5" },
];
const contractOptions = [
  { label: "Per hour", value: "per hour" },
  { label: "Per Week", value: "per week" },
  { label: "Per Month", value: "per month" },
];

export default function CreateJobOnePage() {
  const { formData, updateFormData } = useFormContext();
  const [isComplete, setIsComplete] = useState(false);
  const goTo = useGoTo();

  useEffect(() => {
    checkCompletion();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "salaryRangeFrom" || name === "salaryRangeTo") {
      const numericValue = value.replace(/[^0-9]/g, "");
      updateFormData(name, numericValue);
    } else {
      updateFormData(name, value);
    }
    checkCompletion();
  };

  const handleRadioChange = (name, value) => {
    updateFormData(name, value);
  };

  const handleCheckboxChange = (key, value) => {
    let updatedArray;
    if (key === "additionalCompensation") {
      updatedArray = formData.additionalCompensation.includes(value)
        ? formData.additionalCompensation.filter((item) => item !== value)
        : [...formData.additionalCompensation, value];
    } else if (key === "benefits") {
      updatedArray = formData.benefits.includes(value)
        ? formData.benefits.filter((item) => item !== value)
        : [...formData.benefits, value];
    }

    updateFormData(key, updatedArray);
  };

  const handleDropdownChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    updateFormData(name, selectedOption.value);
    checkCompletion();
  };

  const checkCompletion = () => {
    const requiredFields = [
      "jobTitle",
      "jobType",
      "experienceRequired",
      "salaryRangeFrom",
      "salaryRangeTo",
      "contractType",
      "additionalCompensation",
      "benefits",
    ];
    const allFilled = requiredFields.every((field) => {
      const value = formData[field];
      if (Array.isArray(value)) return value.length > 0;
      return value && value.trim() !== "";
    });
    setIsComplete(allFilled);
  };

  const formatNumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <ErrorBoundary>
      <Helmet>
        <title>WIIFLEX</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex w-full justify-start min-h-screen items-stretch bg-white-A700 md:flex-col">
        <FormCoverImg />
        <div className="mb-2 w-1/2 md:w-full mt-[51px]">
          <div className="pl-[5%]">
            <Heading size="3xl" as="h2" className="!text-teal-900">
              Post a job
            </Heading>
            <div className="mt-[22px] flex items-center gap-[25px]">
              <Text
                as="p"
                className="text-gray-600_01 whitespace-nowrap cursor-pointer"
              >
                Company Details
              </Text>
              <Heading
                size="xl"
                as="h3"
                className="text-light_blue-700 whitespace-nowrap border-b-[0.5px] border-light_blue-700 cursor-pointer"
              >
                Job Details
              </Heading>
              <Text
                as="p"
                className="text-gray-600_01 whitespace-nowrap cursor-pointer"
              >
                Candidate Requirements
              </Text>
              <Text
                as="p"
                className="text-gray-600_01 whitespace-nowrap cursor-pointer"
              >
                Job Description
              </Text>
            </div>
            <Input
              name="jobTitle"
              placeholder={`Job Title`}
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="mt-[30px] h-[70px] w-[62%] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              inputClassName="font-bold"
            >
              Sr. Python Developer
            </Input>
            <Text as="p" className="mt-[29px] !text-cyan-900">
              What Type of Job is it?
            </Text>
            <RadioGroup
              name="jobType"
              onChange={(e) => handleRadioChange("jobType", e)}
              className="mt-[18px] flex flex-col"
            >
              <Radio
                value="fulltime"
                label="Full-Time"
                className="mr-6 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                checked={formData.jobType === "fulltime"}
              />
              <Radio
                value="parttime"
                label="Part-Time"
                className="mr-[19px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                checked={formData.jobType === "parttime"}
              />
              <Radio
                value="temporary"
                label="Temporary"
                className="mr-3 mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
                checked={true} //formData.jobType.includes("temporary")
              />
              <Radio
                value="contract"
                label="Contract"
                className="mr-[26px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                checked={formData.jobType === "contract"}
              />
              <Radio
                value="internship"
                label="Internship"
                className="mr-[19px] mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
                checked={formData.jobType === "internship"}
              />
              <Radio
                value="commission"
                label="Commission"
                className="mt-5 flex-1 gap-2 p-px text-sm text-cyan-900"
                checked={formData.jobType === "commission"}
              />
            </RadioGroup>

            <div className="flex flex-col items-start w-[62%] rounded border-[0.5px] border-solid border-gray-200_03 mt-[18px] pt-[8.5px] pl-[9px]">
              <Text
                size="xs"
                as="p"
                className="text-sm font-bold !text-gray-500 text-[12px]"
              >
                Experience Required?
              </Text>
              <SelectBox
                size="sm"
                shape="square"
                name="experienceRequired"
                options={experienceOptions}
                onChange={handleDropdownChange}
                className="self-stretch h-10 !px-0"
              />
            </div>
            <Text as="p" className="mt-[13px] !text-cyan-900">
              What is the Pay for this Job?
            </Text>
            <div className="mt-[18px] flex w-[62%] flex-col gap-[15px] md:w-full">
              <div className="flex gap-2.5 relative">
                <Input
                  name="salaryRangeFrom"
                  placeholder={`From`}
                  value={
                    formData.salaryRangeFrom
                      ? formatNumberWithCommas(formData.salaryRangeFrom)
                      : ""
                  }
                  onChange={handleInputChange}
                  className="input-with-dollar h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                  inputClassName="font-bold"
                  prefix="$"
                />

                <Input
                  name="salaryRangeTo"
                  placeholder={`To`}
                  value={
                    formData.salaryRangeTo
                      ? formatNumberWithCommas(formData.salaryRangeTo)
                      : ""
                  }
                  onChange={handleInputChange}
                  className="input-with-dollar h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                  inputClassName="font-bold"
                  prefix="$"
                />
              </div>

              <div className="flex flex-col items-start w-full rounded border-[0.5px] border-solid border-gray-200_03 mt-[18px] pt-[8.5px] pl-[9px]">
                <Text
                  size="xs"
                  as="p"
                  className="text-sm font-bold !text-gray-500 text-[12px]"
                >
                  Contract Type
                </Text>
                <SelectBox
                  size="sm"
                  shape="square"
                  name="contractType"
                  options={contractOptions}
                  onChange={handleDropdownChange}
                  className="self-stretch h-10 !px-0"
                />
              </div>
            </div>
            <div className="mt-[23px] flex w-[58%] flex-col md:w-full">
              <Text as="p" className="leading-6 !text-cyan-900">
                <>
                  Are there Any Additional Form of Compensation <br />
                  Offered?
                </>
              </Text>

              <CheckBox
                name="additionalCompensation"
                value="tips"
                label="Tips"
                checked={formData.additionalCompensation.includes("tips")}
                onChange={() =>
                  handleCheckboxChange("additionalCompensation", "tips")
                }
                className="mt-4 flex-1 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="additionalCompensation"
                value="commission"
                label="Commission"
                checked={formData.additionalCompensation.includes("commission")}
                onChange={() =>
                  handleCheckboxChange("additionalCompensation", "commission")
                }
                className="mt-4 flex-1 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="additionalCompensation"
                value="bonuses"
                label="Bonuses"
                checked={formData.additionalCompensation.includes("bonuses")}
                onChange={() =>
                  handleCheckboxChange("additionalCompensation", "bonuses")
                }
                className="mt-4 flex-1 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="additionalCompensation"
                value="storediscounts"
                label="Store discounts"
                checked={formData.additionalCompensation.includes(
                  "storediscounts"
                )}
                onChange={() =>
                  handleCheckboxChange(
                    "additionalCompensation",
                    "storediscounts"
                  )
                }
                className="mt-4 flex-1 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="additionalCompensation"
                value="otherforms"
                label="Other forms"
                checked={formData.additionalCompensation.includes("otherforms")}
                onChange={() =>
                  handleCheckboxChange("additionalCompensation", "otherforms")
                }
                className="mt-4 flex-1 p-px !text-sm text-cyan-900"
              />
            </div>
            <Text as="p" className="mt-[30px] !text-cyan-900">
              Are Any of the Following Benefits Offered?
            </Text>
            <CheckBox
              name="benefits"
              value="healthinsurance"
              label="Health Insurance"
              checked={formData.benefits.includes("healthinsurance")}
              onChange={() =>
                handleCheckboxChange("benefits", "healthinsurance")
              }
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="dentalinsurance"
              label="Dental Insurance"
              checked={formData.benefits.includes("dentalinsurance")}
              onChange={() =>
                handleCheckboxChange("benefits", "dentalinsurance")
              }
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="visioninsurance"
              label="Vision Insurance"
              checked={formData.benefits.includes("visioninsurance")}
              onChange={() =>
                handleCheckboxChange("benefits", "visioninsurance")
              }
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="retirementplan"
              label="Retirement Plan"
              checked={formData.benefits.includes("retirementplan")}
              onChange={() =>
                handleCheckboxChange("benefits", "retirementplan")
              }
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="signingbonus"
              label="Signing Bonus"
              checked={formData.benefits.includes("signingbonus")}
              onChange={() => handleCheckboxChange("benefits", "signingbonus")}
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="paidtimeoff"
              label="Paid Time off"
              checked={formData.benefits.includes("paidtimeoff")}
              onChange={() => handleCheckboxChange("benefits", "paidtimeoff")}
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="workfromhome"
              label="Work From Home"
              checked={formData.benefits.includes("workfromhome")}
              onChange={() => handleCheckboxChange("benefits", "workfromhome")}
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="flexibleschedule"
              label="Flexible Schedule"
              checked={formData.benefits.includes("flexibleschedule")}
              onChange={() =>
                handleCheckboxChange("benefits", "flexibleschedule")
              }
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="parentalleave"
              label="Parental Leave"
              checked={formData.benefits.includes("parentalleave")}
              onChange={() => handleCheckboxChange("benefits", "parentalleave")}
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <CheckBox
              name="benefits"
              value="relocationassistance"
              label="Relocation Assistance"
              checked={formData.benefits.includes("relocationassistance")}
              onChange={() =>
                handleCheckboxChange("benefits", "relocationassistance")
              }
              className="mt-4 flex-1 p-px !text-sm text-cyan-900"
            />
            <Link to="/jobs/create/candidate-req">
              <Button
                size="xl"
                shape="round"
                className={`mt-[23px] w-[62%] font-bold sm:px-5 ${
                  isComplete
                    ? "bg-light_blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isComplete}
                onClick={() => goTo("/jobs/create/candidate-req")}
              >
                Next
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
