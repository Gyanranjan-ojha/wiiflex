import React, { useState, useEffect } from "react";

const ProgressBar = ({ step, totalSteps }) => {
  // const progress = (step / totalSteps) * 100;

  const [progress, setProgress] = useState((step / totalSteps) * 100);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setProgress((step / totalSteps) * 100);
    setHighlight(true);

    const timeout = setTimeout(() => {
      setHighlight(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [step, totalSteps]);

  // return (
  //   <>
  //     <div className="w-1/2 border border-light_blue-700 rounded-full h-2.5 my-4">
  //       <div
  //         className="bg-light_blue-700 h-2.5 rounded-full"
  //         style={{ width: `${progress}%` }}
  //       ></div>
  //     </div>
  //   </>
  // );

  return (
    <div className="w-1/2 my-4 relative">
      <div
        className={`border-[1px] border-light_blue-700 rounded-full h-2.5 overflow-hidden transition-shadow duration-1000 ${
          highlight ? "shadow-lg" : ""
        }`}
      >
        <div
          className="bg-light_blue-700 h-2.5 rounded-full transition-width duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
