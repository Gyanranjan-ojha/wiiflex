import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Img } from "../../components";
import Navbar from "../../components/Navbar";
import DropdownWithOptions from "../../components/DropdownWithQuestions";
import CommonInput from "../../components/CommonInput";
import { useFormContext } from "../../context/FormContextProvider";
import { useScreenTestContext } from "../../context/ScreenTestContextProvider";
import ErrorBoundary from "../../components/ErrorBoundry";
import { useGoTo } from "../../lib/utils";
import CustomQuestions from "../../components/CustomQuestions";

export default function ScreeningtestTwoPage() {
  const goTo = useGoTo();
  const { jobId } = useParams();
  const { sharedInputValue, handleInputChange } = useFormContext();
  const { screenTestData, updateScreenTestData, validateScreenTest } =
    useScreenTestContext();

  const deleteQuestion = (questionText) => {
    updateScreenTestData({
      ...screenTestData,
      questions: screenTestData.questions.filter(
        (q) => q.question !== questionText
      ),
    });
  };

  const isComplete =
    screenTestData.questions.length !== 0 &&
    screenTestData.screening_test_name.trim() !== "";

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
      <div className="flex w-full items-center justify-center bg-white-A700 md:flex-col">
        <div className="relative ml-[-1px] flex w-full flex-col items-center justify-center gap-[73px] self-end bg-white-A700 pb-5 pt-6 md:ml-0 md:gap-[54px] md:p-5 md:pb-5 md:pl-5 sm:gap-9 sm:py-5">
          <div className="flex w-[55%] max-w-[644px] flex-col items-center md:w-full">
            <Heading size="3xl" as="h2" className="self-start !text-teal-900">
              Add Screening Tests
            </Heading>
            <CommonInput
              value={sharedInputValue}
              onChange={handleInputChange}
            />
            <ul className="mt-4 w-full list-disc">
              {screenTestData.questions.map((question, index) => {
                return (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b py-2"
                  >
                    {question.question}
                    <Button
                      onClick={() => deleteQuestion(question.question)}
                      className="text-red-500 bg-transparent pr-0"
                    >
                      <Img
                        className="w-4 h-4"
                        src="/images/icons_delete.png"
                        alt="Delete"
                      />
                    </Button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-[35px] flex flex-col items-start gap-3.5 self-stretch">
              <Heading as="h3" className="ml-1.5 !text-gray-600 md:ml-0">
                Select Questions
              </Heading>
              <DropdownWithOptions jobId={jobId} />
              <CustomQuestions jobId={jobId} />
            </div>
            <Button
              size="xl"
              shape="round"
              className={`mt-[50px] w-full transition-transform duration-300 hover:scale-105 font-bold sm:px-5 ${
                isComplete
                  ? "bg-light_blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => goTo(`/ScreeningtestThree/${jobId}`)}
              disabled={!isComplete}
            >
              Finalise Test
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
