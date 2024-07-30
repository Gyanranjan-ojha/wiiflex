import ProgressBar from "../../components/ProgressBar";
import React, { Suspense, useContext } from "react";
import { QuestionsContext } from "../../context/ProfileQuestionsProvider";
import { Img } from "../../components";

const steps = [
  React.lazy(() => import("../../components/PersonalInfoForm")), //1
  React.lazy(() => import("../../components/AboutMeForm")), //2
  React.lazy(() => import("../../components/ExperienceForm")), //3
  React.lazy(() => import("../../components/EducationForm")), //4
  React.lazy(() => import("../../components/SkillsForm")), //5
  React.lazy(() => import("../../components/PortfolioForm")), //6
];

export default function FormStepsPage() {
  const { currentStep, nextStep, prevStep } = useContext(QuestionsContext);
  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="mx-auto p-4 flex flex-col items-center">
      <p>Step {currentStep + 1} / 6</p>
      <ProgressBar step={currentStep + 1} totalSteps={steps.length} />
      <Suspense fallback={<div>Loading...</div>}>
        <CurrentStepComponent onNext={nextStep} onPrevious={prevStep} />
      </Suspense>
    </div>
  );
}
