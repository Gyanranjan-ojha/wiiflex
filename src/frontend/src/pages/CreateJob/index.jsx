import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Heading, Text, Switch } from "../../components";
import { useFormContext } from "../../context/FormContextProvider";
import FormCoverImg from "../../components/FormCoverImg";
import { useGoTo } from "../../lib/utils";
import { useUserDetails } from "../../context/UserContextProvider";

export default function CreateJobPage() {
  const { formData, updateFormData } = useFormContext();
  const [isComplete, setIsComplete] = useState(false);
  const [sameAsCompanyLocation, setSameAsCompanyLocation] = useState(false);
  const { userInfo } = useUserDetails();

  const goTo = useGoTo();

  useEffect(() => {
    // Autofill "Your Name" and "Your Company Name" on component mount
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const companyName = localStorage.getItem("companyName");

    const fullName = `${firstName} ${lastName}`;

    updateFormData("yourName", fullName);
    updateFormData("companyName", companyName);
    checkCompletion();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "companySize") {
      if (/^\d*$/.test(value)) {
        // if the string contains only digits
        updateFormData(name, value === "" ? 0 : Number(value));
      }
    } else {
      updateFormData(name, value);
    }
    checkCompletion();
  };

  const handleLocationToggle = (checked) => {
    setSameAsCompanyLocation(checked);
    if (checked) {
      // Copy company location details to job location
      updateFormData("jobCity", formData.companyCity);
      updateFormData("jobState", formData.companyState);
      updateFormData("jobCountry", formData.companyCountry);
      updateFormData("jobStreetAddress", formData.companyStreetAddress);
    } else {
      // Clear job location details
      updateFormData("jobCity", "");
      updateFormData("jobState", "");
      updateFormData("jobCountry", "");
      updateFormData("jobStreetAddress", "");
    }
  };

  useEffect(() => {
    checkCompletion();
  }, [formData]);

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
      if (typeof value === "string") {
        return value.trim() !== "";
      } else {
        return value !== null && value !== undefined; // Ensure numbers are not null or undefined
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
      <div className="flex w-full justify-start min-h-screen items-stretch bg-white-A700 md:flex-col">
        <FormCoverImg />
        <div className="mb-2 w-1/2 md:w-full mt-[51px]">
          <div className="flex-col items-start pl-[5%]">
            <Heading size="3xl" as="h2" className="!text-teal-900">
              Post a job
            </Heading>
            <div className="mt-[22px] flex items-center gap-[25px]">
              <Heading
                size="xl"
                as="h3"
                className="text-light_blue-700 whitespace-nowrap border-b-[0.5px] border-light_blue-700 cursor-pointer"
              >
                Company Details
              </Heading>
              <Text
                as="p"
                className="text-gray-600_01 whitespace-nowrap cursor-pointer"
              >
                Job Details
              </Text>
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
            <div className="mt-[38px] flex w-[62%] flex-col gap-[15px] md:w-full md:p-5">
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Your Company Name"
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
              >
                ABC Tech Consulting
              </Input>

              <Input
                type="text"
                name="companySize"
                placeholder="Company Size"
                value={formData.companySize === 0 ? "" : formData.companySize}
                onChange={handleInputChange}
                className="h-[70px] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
              >
                How Many Employees?
              </Input>
              <Input
                type="text"
                name="yourName"
                placeholder="Your Name"
                value={formData.yourName}
                onChange={handleInputChange}
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
              ></Input>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
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
                  placeholder="City"
                  value={formData.companyCity}
                  onChange={handleInputChange}
                  className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                  inputClassName="font-bold"
                >
                  HYD
                </Input>
                <Input
                  name="companyState"
                  placeholder="State"
                  value={formData.companyState}
                  onChange={handleInputChange}
                  className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                  inputClassName="font-bold"
                >
                  TG
                </Input>
              </div>
              <Input
                name="companyCountry"
                placeholder="Country"
                value={formData.companyCountry}
                onChange={handleInputChange}
                className="h-[70px] w-[48%] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
              >
                India
              </Input>
              <Input
                name="companyStreetAddress"
                placeholder="Company Street Address"
                value={formData.companyStreetAddress}
                onChange={handleInputChange}
                className="h-[70px] self-stretch rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
              >
                123 Hitech City, Hyderabad, 500082
              </Input>
            </div>
            <Heading as="p" className="mt-6">
              Job Location
            </Heading>
            <div className="mt-6 flex w-[62%] flex-col items-start md:w-full md:p-5">
              <div className="h-[20px] w-[20px] rounded-[10px]  bg-white-A700" />
              <div className="relative mt-[-20px] flex items-center gap-1.5">
                <Switch
                  checked={sameAsCompanyLocation}
                  onChange={handleLocationToggle}
                  className="self-start"
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
                placeholder="City"
                value={formData.jobCity}
                onChange={handleInputChange}
                className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
              >
                HYD
              </Input>
              <Input
                name="jobState"
                placeholder="State"
                value={formData.jobState}
                onChange={handleInputChange}
                className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                inputClassName="font-bold"
              >
                TG
              </Input>
            </div>
            <Input
              name="jobCountry"
              placeholder="Country"
              value={formData.jobCountry}
              onChange={handleInputChange}
              className="mt-[15px] h-[70px] w-[30%] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              inputClassName="font-bold"
            >
              India
            </Input>
            <Input
              name="jobStreetAddress"
              placeholder="Company Street Address"
              value={formData.jobStreetAddress}
              onChange={handleInputChange}
              className="mt-[15px] h-[70px] w-[62%] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              inputClassName="font-bold"
            >
              123 Hitech City, Hyderabad, 500082
            </Input>
            <Button
              size="xl"
              shape="round"
              className={`mt-[11px] w-[62%] font-bold sm:px-5 ${
                isComplete
                  ? "bg-light_blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isComplete}
              onClick={() => goTo("/jobs/create/job-details")}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
