import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Img } from "../../components";
import Navbar from "../../components/Navbar";
import CommonInput from "../../components/CommonInput";
import { useFormContext } from "../../context/FormContextProvider";
import { useScreenTestContext } from "../../context/ScreenTestContextProvider";
import axios from "axios";
import ErrorBoundary from "../../components/ErrorBoundry";
import { baseUrl, useGoTo } from "../../lib/utils";

export default function ScreeningtestThreePage() {
  const [expanded, setExpanded] = useState({});
  const { sharedInputValue, handleInputChange } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { jobId } = useParams();
  const goTo = useGoTo();

  const { screenTestData, updateScreenTestData, validateScreenTest } =
    useScreenTestContext();

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const newHandleInputChange = (event) => {
    handleInputChange(event);
    checkCompletion();
  };

  useEffect(() => {
    checkCompletion();
  }, [screenTestData]);

  const handleScreenTest = async () => {
    const { job_id, screening_test_name, questions } = screenTestData;
    console.log("handleScreenTest:", screenTestData);

    const requestData = {
      job_id: job_id,
      screening_test_name: screening_test_name,
      questions_data: questions.map((question) => ({
        question_type: question.questionType || null, // Map `null` if `questionType` is undefined or null
        question: question.question,
        options: question.options || [], // Ensure there are default to an empty array if undefined
        answer:
          typeof question.correctAnswer === "number"
            ? question.correctAnswer
            : null, // Map the correct answer or `null` if it's not a number
      })),
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/screening_test/create_screening_test/`,
        requestData
      );
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        alert("Screening Test Created Successful!");
        goTo(`/all-candidates/${jobId}`);
      } else {
        console.error("Registration failed with status:", response.status);
      }
    } catch (err) {
      alert(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const checkCompletion = () => {
    const isScreenTestComplete =
      screenTestData.screening_test_name.trim() !== "" &&
      screenTestData.questions.length > 0;
    setIsComplete(isScreenTestComplete);
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
      <Navbar isScreenTestPage={true} id={jobId} />
      <div className="flex w-full flex-col items-center justify-center bg-white-A700 pt-6 sm:pt-5">
        <div className="flex w-[55%] max-w-[565px] items-start justify-between gap-5 md:w-full md:flex-col md:p-5">
          <div className="flex w-full flex-col items-center md:w-full">
            <Heading size="3xl" as="h2" className="self-start !text-teal-900">
              Add Screening Tests
            </Heading>
            <div className="self-stretch">
              <div className="flex flex-col items-center">
                <CommonInput
                  value={sharedInputValue}
                  onChange={newHandleInputChange}
                />
                <Heading as="h3" className="mt-7 self-start !text-gray-600">
                  Questions
                </Heading>
                <div className="mt-[18px] flex flex-col gap-5 self-stretch">
                  {screenTestData?.questions?.map((questionItem, index) => {
                    const { questionType, question, options, correctAnswer } =
                      questionItem;

                    // Format values to handle undefined, null, or empty cases
                    const displayQuestionType = questionType || "NA";
                    const displayOptions = options?.length
                      ? options.join(", ")
                      : "NA";
                    const displayCorrectAnswer = correctAnswer ?? "NA";

                    return (
                      <div key={index} className="cursor-pointer">
                        <div
                          className="flex justify-between w-full"
                          onClick={() => toggleExpand(index)}
                        >
                          <Heading as="h4">{question}</Heading>
                          <Img
                            src="/images/img_path.svg"
                            alt="path"
                            className={`h-[6px] transition-transform duration-300 cursor-pointer ${
                              expanded[index] ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        {expanded[index] && (
                          <div className="">
                            <Heading as="h4">
                              Type: {displayQuestionType}
                            </Heading>
                            <Heading as="h4">Options: {displayOptions}</Heading>
                            <Heading as="h4">
                              Correct Answer:
                              {displayCorrectAnswer !== "NA"
                                ? options[displayCorrectAnswer]
                                : displayCorrectAnswer}
                            </Heading>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-[61px] w-full flex items-center justify-between md:w-full">
                  <Button
                    size="xl"
                    shape="round"
                    className="!bg-white-A700 text-light_blue-700 border-[1px] border-light_blue-700 min-w-[246px] font-bold transition-transform duration-300 hover:scale-105 sm:px-5"
                    onClick={() => goTo(`/screeningtesttwo/${jobId}`)}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="xl"
                    shape="round"
                    className={`min-w-[246px] font-bold transition-transform duration-300 hover:scale-105 sm:px-5 ${
                      isComplete
                        ? "bg-light_blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleScreenTest}
                    disabled={!isComplete}
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
                    Send Test
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
