import React, { useState } from "react";

function DropdownWithQuestions() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [questionType, setQuestionType] = useState("Written");
  const [customQuestion, setCustomQuestion] = useState("");
  const [mcqOptions, setMcqOptions] = useState(Array(4).fill(""));
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const questions = [
    "How many years of experience you have?",
    "Do you work with Figma?",
    "How many hours can you work per week?",
    "What is your expected monthly salary?",
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (question) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(
        selectedQuestions.filter((item) => item !== question)
      );
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
    setCustomQuestion("");
    setMcqOptions(Array(4).fill(""));
    setCorrectAnswer(null);
  };

  const handleMcqOptionChange = (index, value) => {
    const updatedOptions = mcqOptions.map((option, idx) =>
      idx === index ? value : option
    );
    setMcqOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    console.log({
      questionType,
      question: customQuestion,
      mcqOptions,
      correctAnswer,
    });
    // Reset the form after adding the question
    setCustomQuestion("");
    setMcqOptions(Array(4).fill(""));
    setCorrectAnswer(null);
    setShowAddQuestion(false);
  };

  const handleCancel = () => {
    setCustomQuestion("");
    setMcqOptions(Array(4).fill(""));
    setCorrectAnswer(null);
    setShowAddQuestion(false);
  };

  return (
    <div className="flex flex-col gap-1 self-stretch rounded-lg border-[1px] border-light_blue-300 bg-white-A700 pb-3.5 pt-[15px]">
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-3 cursor-pointer"
      >
        <img src="/images/img_search.svg" alt="search" className="h-[16px]" />
        <h4 className="ml-0 !text-light_blue-700">Search Questions</h4>
      </div>
      {isOpen && (
        <>
          {questions.map((question, index) => (
            <div
              key={index}
              onClick={() => handleCheckboxChange(question)}
              className="flex items-center gap-2 p-3 border-t-[1px] border-gray-300 cursor-pointer"
            >
              <img
                src={
                  selectedQuestions.includes(question)
                    ? "/images/img_checkmark_filled.svg"
                    : "/images/img_checkmark.svg"
                }
                alt="checkmark"
                className="h-[19px] w-[19px]"
              />
              <h5>{question}</h5>
            </div>
          ))}
          <div
            className="p-3 border-t-[1px] cursor-pointer"
            onClick={() => setShowAddQuestion(!showAddQuestion)}
          >
            <h5 className="!text-light_blue-700">+ Add Custom Questions</h5>
          </div>
          {showAddQuestion && (
            <div className="flex flex-col p-3">
              <label className="text-gray-700">Question Type</label>
              <select
                className="mb-2 p-2 border rounded"
                value={questionType}
                onChange={handleQuestionTypeChange}
              >
                <option value="Written">Written</option>
                <option value="MCQ">MCQ</option>
              </select>
              {questionType === "Written" ? (
                <textarea
                  placeholder="Type question..."
                  className="p-2 border rounded"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                />
              ) : (
                mcqOptions.map((option, index) => (
                  <div key={index} className="flex items-center my-2">
                    <input
                      type="radio"
                      name="correctAnswer"
                      value={index}
                      onChange={() => setCorrectAnswer(index)}
                      checked={correctAnswer === index}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      placeholder={`Answer ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleMcqOptionChange(index, e.target.value)
                      }
                      className="p-2 border rounded flex-grow"
                    />
                  </div>
                ))
              )}
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black rounded p-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
                  onClick={handleAddQuestion}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DropdownWithQuestions;
