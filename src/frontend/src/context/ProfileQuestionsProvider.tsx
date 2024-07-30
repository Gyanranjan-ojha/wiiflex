import React, { createContext, useState, ReactNode, FC } from "react";

type FormData = {
  [key: string]: any;
};

type QuestionsContextType = {
  formData: FormData;
  currentStep: number;
  updateFormData: (newData: FormData) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined
);

export const ProfileQuestionsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (newData: FormData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <QuestionsContext.Provider
      value={{ formData, updateFormData, currentStep, nextStep, prevStep }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
