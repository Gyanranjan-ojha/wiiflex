import { Fragment, useEffect, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { Text } from "../Text";
import { SelectBox } from "../SelectBox";
import { baseUrl } from "../../lib/utils";
import { CheckBox } from "../CheckBox";
import { useScreenTestContext } from "../../context/ScreenTestContextProvider";
import axios from "axios";

const questionTypes = [
  { label: "MCQ", value: "mcq" },
  { label: "Written", value: "written" },
];

const CustomQuestions = ({ jobId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [questionType, setQuestionType] = useState("written");
  const [customQuestion, setCustomQuestion] = useState("");
  const [mcqOptions, setMcqOptions] = useState(Array(4).fill(""));
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [searchQuestionInput, setSearchQuestionInput] = useState("");
  const [questions, setQuestions] = useState([]);

  const { screenTestData, updateScreenTestData, validateScreenTest } =
    useScreenTestContext();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleAddQuestion = () => setShowAddQuestion(!showAddQuestion);

  const handleAddQuestion = () => {
    const newQuestion = {
      questionType,
      question: customQuestion,
      options: questionType === "mcq" ? mcqOptions : [],
      correctAnswer: questionType === "mcq" ? correctAnswer : null,
    };
    // Update the screenTestData with the new question
    updateScreenTestData({
      ...screenTestData,
      questions: [...screenTestData.questions, newQuestion],
    });

    setCustomQuestion("");
    setMcqOptions(Array(4).fill(""));
    setCorrectAnswer(null);

    setShowAddQuestion(false);
    // validateScreenTest();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleMcqOptionChange = (index, value) => {
    const updatedOptions = mcqOptions.map((option, idx) =>
      idx === index ? value : option
    );
    setMcqOptions(updatedOptions);
  };

  const handleDropdownChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setQuestionType(selectedOption.value);
    updateScreenTestData({
      ...screenTestData,
      // This is a hypothetical update, adjust according to your actual data structure needs
      currentQuestionType: selectedOption.value,
    });
    checkCompletion();
  };
  const checkCompletion = () => {
    // const requiredFields = [
    //   "jobTitle",
    //   "jobType",
    //   "replace all with required attr.",
    // ];
    // const allFilled = requiredFields.every((field) => {
    //   const value = formData[field];
    //   if (Array.isArray(value)) return value.length > 0;
    //   return value && value.trim() !== "";
    // });
    setIsComplete(true);
  };

  const handleCheckboxChange = (question) => {
    const isCurrentlySelected = selectedQuestions.includes(question);
    if (isCurrentlySelected) {
      setSelectedQuestions(
        selectedQuestions.filter((item) => item !== question)
      );
      // updateScreenTestData({
      //   ...screenTestData,
      //   questions: screenTestData.questions.filter(
      //     (q) => q.question !== question
      //   ),
      // });
    } else {
      setSelectedQuestions([...selectedQuestions, question]);

      // const newQuestion = {
      //   questionType: null, //'predefined', may be later
      //   question: question,
      //   options: [],
      //   correctAnswer: null,
      // };

      // updateScreenTestData({
      //   ...screenTestData,
      //   questions: [...screenTestData.questions, newQuestion],
      // });
    }
  };

  const handleInputChange = (index) => (e) => {
    const { name, value } = e.target;
    // Check if this is for MCQ options
    if (name.startsWith("MCQAnswer")) {
      handleMcqOptionChange(index, value);
    } else {
      // Otherwise, handle regular input changes
      setCustomQuestion(value); // Assuming this input is for custom questions
    }
  };
  const handleQuestionInputs = (e) => {
    const { name, value } = e.target;
    setSearchQuestionInput(value);
  };

  useEffect(() => {
    if (jobId > 0) {
      updateScreenTestData({ ...screenTestData, job_id: jobId });
    }
  }, [jobId]);

  useEffect(() => {
    const fetchQuestions = async (searchString = "") => {
      try {
        const response = await axios.get(
          `${baseUrl}/screening_test/filter_questions`,
          {
            params: { question: searchString },
          }
        );

        if (response.status === 200) {
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
      }
    };
    fetchQuestions(searchQuestionInput).then(setQuestions);
  }, [searchQuestionInput]);

  const addQuestions = () => {
    const newQuestions = selectedQuestions.map((question) => ({
      questionType: null, // 'predefined', may be later determined
      question: question, // Assuming 'question' is an object with a 'question' property
      options: [], // Empty options array as default
      correctAnswer: null, // No correct answer defined by default
    }));

    // Combine existing questions with the newly formatted ones
    const updatedQuestions = [...screenTestData.questions, ...newQuestions];

    // Update the global state with the newly combined questions array
    updateScreenTestData({
      ...screenTestData,
      questions: updatedQuestions,
    });
    setSelectedQuestions([]);
  };

  const cancelSelection = () => {
    setIsOpen(false);
    setSelectedQuestions([]);
  };

  return (
    <>
      <div className="flex flex-col gap-1 self-stretch rounded-lg border-[1px] border-light_blue-300 bg-white-A700">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="p-3 cursor-pointer]" onClick={toggleAddQuestion}>
            <h5 className="!text-light_blue-700 font-bold leading-[38px]">
              + Add Custom Questions
            </h5>
          </div>
        </div>
        {isOpen &&
          questions.map((item, index) => {
            const { question } = item;
            return (
              <div
                key={index}
                onClick={() => handleCheckboxChange(question)}
                className="flex items-center gap-2 p-3 border-t-[1px] border-gray-300 cursor-pointer"
              >
                <img
                  src={
                    selectedQuestions.includes(question)
                      ? "/images/img_checkmark.svg"
                      : "/images/img_checkmark1.svg" //checked
                  }
                  alt="checkmark"
                  className="h-[19px] w-[19px]"
                />
                <h5>{question}</h5>
              </div>
            );
          })}
        {/* {isOpen && (
          <div className="w-full flex justify-end space-x-2 p-3">
            <Button
              onClick={cancelSelection}
              shape="round"
              className="w-[150px] !bg-white-A700 text-light_blue-700 border-[1px] border-light_blue-700 font-bold transition-transform duration-300 hover:scale-105 sm:px-5"
            >
              Cancellllllll
            </Button>
            <Button
              shape="round"
              onClick={addQuestions}
              className="w-[150px] font-bold transition-transform duration-300 hover:scale-105 sm:px-5"
            >
              Add Questionssssss
            </Button>
          </div>
        )} */}
      </div>
      <div className="w-full">
        {showAddQuestion && (
          <>
            <Input
              type="text"
              name="question"
              placeholder="Type Question..."
              onChange={handleInputChange(null)}
              value={customQuestion}
              className="mt-5 !h-[70px] self-stretch rounded border-[0.5px] border-solid border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              inputClassName="font-bold"
            />
            <div className="flex flex-col items-start rounded border-[0.5px] border-solid border-gray-200_03 mt-[18px] pt-[8.5px] pl-[9px]">
              <Text
                size="xs"
                as="p"
                className="text-sm font-bold !text-gray-500 text-[12px]"
              >
                Question type
              </Text>
              <SelectBox
                size="sm"
                shape="square"
                name="questionType"
                options={questionTypes}
                onChange={handleDropdownChange}
                className="self-stretch h-10 !px-0"
              />
            </div>
          </>
        )}

        {showAddQuestion && questionType === "mcq" && (
          <div className="mt-2 p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold mb-3 text-cyan-900">
              Select the correct answer
            </div>
            {mcqOptions.map((option, index) => (
              <Fragment key={index}>
                <div className="mr-2 font-semibold text-cyan-900">
                  Answer {index + 1}
                </div>
                <div key={index} className="flex items-center my-4">
                  <input
                    type="radio"
                    name="correctAnswer"
                    id={`answer-${index}`}
                    value={index}
                    onChange={() => setCorrectAnswer(index)}
                    checked={correctAnswer === index}
                    className="mr-2 form-radio h-5 w-5"
                  />
                  <label
                    htmlFor={`answer-${index}`}
                    className="flex flex-grow items-center"
                  >
                    <Input
                      type="text"
                      name={`MCQAnswer${index}`}
                      placeholder={`Type Answer ${index + 1}`}
                      onChange={handleInputChange(index)}
                      value={option}
                      className="w-[140px] h-[35px] self-stretch rounded border-[0.5px] border-solid border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                      inputClassName="font-bold"
                    />
                  </label>
                </div>
              </Fragment>
            ))}
          </div>
        )}
        {showAddQuestion && (
          <div className="mt-2 flex flex-col w-full">
            <div className="flex mt-2 space-x-2">
              <Button
                onClick={toggleAddQuestion}
                shape="round"
                className="text-light_blue-700 bg-transparent rounded border-[1px] border-light_blue-700 text-black p-2 transition-transform duration-300 hover:scale-105 font-bold"
              >
                Cancel
              </Button>
              <Button
                shape="round"
                className="bg-light_blue-700 text-white p-2 transition-transform duration-300 hover:scale-105 font-bold"
                onClick={handleAddQuestion}
              >
                Add Questions
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomQuestions;
