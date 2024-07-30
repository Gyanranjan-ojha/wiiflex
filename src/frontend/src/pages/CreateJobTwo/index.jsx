import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Input,
  Heading,
  Text,
  CheckBox,
  SelectBox,
} from "../../components";
import { useFormContext } from "../../context/FormContextProvider";
import FormCoverImg from "../../components/FormCoverImg";
import ErrorBoundary from "../../components/ErrorBoundry";
import { useGoTo } from "../../lib/utils";

const joiningOptions = [
  { label: "Immediate (within 15 days)", value: "15" },
  { label: "30 days", value: "30" },
  { label: "45 days", value: "45" },
  { label: "60 days", value: "60" },
  { label: "90 days", value: "90" },
];

const remoteHireOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export default function CreateJobTwoPage() {
  const { formData, updateFormData } = useFormContext();
  const [isComplete, setIsComplete] = useState(false);
  const goTo = useGoTo();

  useEffect(() => {
    checkCompletion();
  }, [formData]);

  const handleInputChange = (e) => {
    if (e.target.name === "isHireFullyRemote") {
      if (e.target.value === "yes") {
        updateFormData(e.target.name, true);
      } else {
        updateFormData(e.target.name, false);
      }
    } else {
      updateFormData(e.target.name, e.target.value);
    }
    checkCompletion();
  };
  const handleDropdownChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    updateFormData(name, selectedOption.value);
    checkCompletion();
  };

  const checkCompletion = () => {
    const requiredFields = [
      "hiresRequired",
      "urgency",
      "companyWebsite",
      "availability",
      "isHireFullyRemote",
    ];

    const allFilled = requiredFields.every((field) => {
      const value = formData[field];
      if (Array.isArray(value)) {
        return value.length > 0;
      } else if (typeof value === "boolean") {
        return value === true || value === false; // Check if boolean values are true or false
      } else if (typeof value === "string") {
        return value.trim() !== "";
      } else {
        return value !== null && value !== undefined; // General fallback for other types like numbers
      }
    });
    setIsComplete(allFilled);
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
    } else if (key === "availability") {
      updatedArray = formData.availability.includes(value)
        ? formData.availability.filter((item) => item !== value)
        : [...formData.availability, value];
    }

    updateFormData(key, updatedArray);
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
              <Text
                as="p"
                className="text-gray-600_01 whitespace-nowrap cursor-pointer"
              >
                Job Details
              </Text>

              <Heading
                size="xl"
                as="h3"
                className="text-light_blue-700 whitespace-nowrap border-b-[0.5px] border-light_blue-700 cursor-pointer"
              >
                Candidate Requirements
              </Heading>
              <Text
                as="p"
                className="text-gray-600_01 whitespace-nowrap cursor-pointer"
              >
                Job Description
              </Text>
            </div>

            <Heading as="h4" className="mt-[25px]">
              Candidate Requirements
            </Heading>
            <div className="mt-[13px] flex w-[62%] flex-col gap-[15px] md:w-full">
              <Input
                name="hiresRequired"
                placeholder={`How Many Hires Do You Require For this Job?`}
                value={formData.hiresRequired}
                onChange={handleInputChange}
                className="h-[70px] flex-grow gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
              >
                10
              </Input>
              <div className="flex flex-col items-start rounded border-[0.5px] border-solid border-gray-200_03 pt-[8.5px] pl-[9px]">
                <Text
                  size="xs"
                  as="p"
                  className="text-sm font-bold !text-gray-500 text-[12px]"
                >
                  How Urgently Do You Need to Make a Hire?
                </Text>
                <SelectBox
                  size="sm"
                  shape="square"
                  name="urgency"
                  options={joiningOptions}
                  onChange={handleDropdownChange}
                  className="self-stretch h-10 !px-0"
                />
              </div>
            </div>
            <Heading as="h6" className="ml-[7px] mt-7 md:ml-0">
              Additional Job Details
            </Heading>
            <div className="ml-[7px] mt-[17px] flex w-[60%] flex-col items-start md:ml-0 md:w-full">
              <Text as="p" className="!text-cyan-900">
                What Availability is Needed For This Job?
              </Text>
              <CheckBox
                name="availability"
                value="mondaytofriday"
                label="Monday to Friday"
                checked={formData.availability.includes("mondaytofriday")}
                onChange={() =>
                  handleCheckboxChange("availability", "mondaytofriday")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="noweekends"
                label="No Weekends"
                checked={formData.availability.includes("noweekends")}
                onChange={() =>
                  handleCheckboxChange("availability", "noweekends")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="weekendsrequired"
                label="Weekends Required"
                checked={formData.availability.includes("weekendsrequired")}
                onChange={() =>
                  handleCheckboxChange("availability", "weekendsrequired")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="holidaysrequired"
                label="Holidays Required"
                checked={formData.availability.includes("holidaysrequired")}
                onChange={() =>
                  handleCheckboxChange("availability", "holidaysrequired")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="dayshift"
                label="Day Shift"
                checked={formData.availability.includes("dayshift")}
                onChange={() =>
                  handleCheckboxChange("availability", "dayshift")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="nightshift"
                label="Night Shift"
                checked={formData.availability.includes("nightshift")}
                onChange={() =>
                  handleCheckboxChange("availability", "nightshift")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="overtime"
                label="Overtime"
                checked={formData.availability.includes("overtime")}
                onChange={() =>
                  handleCheckboxChange("availability", "overtime")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="hourshift"
                label="8 Hour Shift"
                checked={formData.availability.includes("hourshift")}
                onChange={() =>
                  handleCheckboxChange("availability", "hourshift")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="hourshift1"
                label="10 Hour Shift"
                checked={formData.availability.includes("hourshift1")}
                onChange={() =>
                  handleCheckboxChange("availability", "hourshift1")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="hourshift2"
                label="12 Hour Shift"
                checked={formData.availability.includes("hourshift2")}
                onChange={() =>
                  handleCheckboxChange("availability", "hourshift2")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="oncall"
                label="On Call"
                checked={formData.availability.includes("oncall")}
                onChange={() => handleCheckboxChange("availability", "oncall")}
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
              <CheckBox
                name="availability"
                value="overnightshift"
                label="Overnight Shift"
                checked={formData.availability.includes("overnightshift")}
                onChange={() =>
                  handleCheckboxChange("availability", "overnightshift")
                }
                className="mt-4 flex-1 gap-2 p-px !text-sm text-cyan-900"
              />
            </div>
            <div className="mt-[30px] gap-[15px] flex flex-col w-[62%] md:w-full">
              <div className="flex rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 px-3.5 pt-3">
                <div className="flex flex-col items-start gap-2">
                  <Text size="xs" as="p" className="!text-cyan-900">
                    Please Enter Your Company’s Website
                  </Text>
                  <Input
                    name="companyWebsite"
                    placeholder={`Website`}
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    className="w-[62%] !px-0 rounded border-0 text-sm font-bold text-cyan-900 !placeholder-gray-200 sm:pr-5"
                    inputClassName="font-bold"
                  >
                    Sr. Python Developer
                  </Input>
                </div>
              </div>
              <div className="flex flex-col items-start rounded border-[0.5px] border-solid border-gray-200_03 pt-[8.5px] pl-[9px]">
                <Text
                  size="xs"
                  as="p"
                  className="text-sm font-bold !text-gray-500 text-[12px]"
                >
                  Does This Job Allow Hires Fully Remote?
                </Text>
                <SelectBox
                  size="sm"
                  shape="square"
                  name="isHireFullyRemote"
                  options={remoteHireOptions}
                  onChange={handleDropdownChange}
                  className="self-stretch h-10 !px-0"
                />
              </div>
              <Button
                size="xl"
                shape="round"
                className={`mt-[23px] w-full font-bold sm:px-5 ${
                  isComplete
                    ? "bg-light_blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isComplete}
                onClick={() => goTo("/jobs/create/desc")}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
