import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, TextArea, Text } from "../../components";
import { useFormContext } from "../../context/FormContextProvider";
import FormCoverImg from "../../components/FormCoverImg";
import ErrorBoundary from "../../components/ErrorBoundry";
import { baseUrl, useGoTo } from "../../lib/utils";

export default function CreateJobThreePage() {
  const { formData, updateFormData, validateForm } = useFormContext();
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const goTo = useGoTo();

  useEffect(() => {
    checkCompletion();
  }, [formData]);

  const checkCompletion = () => {
    const isJobDescriptionValid =
      formData.jobDescription && formData.jobDescription.trim() !== "";

    setIsComplete(isJobDescriptionValid);
  };

  const handleInputChange = (e) => {
    updateFormData(e.target.name, e.target.value);
    checkCompletion();
  };

  const handleSubmit = async () => {
    // if (validateForm()) {
    // console.log("validateForm:", validateForm());
    // console.log("handleSubmit FORM:", formData);
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/job/create_job/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        goTo("/all-jobs");
      } else {
        setError(`Opps! something went wrong\n status: ${response.status}`);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
        <div className="mt-[51px] mb-2 flex w-1/2 flex-col gap-7 md:w-full">
          <div className="pl-[5%]">
            <div className="flex flex-col items-start gap-[23px]">
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
                <Text
                  as="p"
                  className="text-gray-600_01 whitespace-nowrap cursor-pointer"
                >
                  Candidate Requirements
                </Text>
                <Heading
                  size="xl"
                  as="h3"
                  className="text-light_blue-700 whitespace-nowrap border-b-[0.5px] border-light_blue-700 cursor-pointer"
                >
                  Job Description
                </Heading>
              </div>
            </div>
            <div className="flex flex-col items-start w-[90%]">
              <div className="flex flex-col items-start self-stretch mt-6">
                <Heading as="h4">Write Your Full Job Description</Heading>
                <Text
                  as="p"
                  className="mt-[5px] w-[100%] leading-6 !text-cyan-900 md:w-full"
                >
                  <>
                    Describe Job Descriptions in Details, Requirements Skills or
                    Education*
                  </>
                </Text>
                <TextArea
                  shape="round"
                  name="jobDescription"
                  placeholder={`Job Description`}
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  className="mt-6 self-stretch !border-gray-200_03 !text-cyan-900 text-sm sm:pb-5 sm:pr-5"
                />
              </div>
              <Button
                size="xl"
                shape="round"
                className={` self-center mt-[23px] w-[62%] font-bold sm:px-5 ${
                  isComplete
                    ? "bg-light_blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isComplete}
                onClick={handleSubmit}
              >
                {loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="mr-3 -ml-1 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Post Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
