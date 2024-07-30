import React, { createContext, useContext, useState, ReactNode } from "react";
import { Education } from "../lib/utils";

type EducationFormContextType = {
  educations: Education[];
  addEducation: (education: Education) => void;
  editEducation: (candidateId: number | undefined, index: number) => void;
  currentEducation: number | null;
};

const EducationFormContext = createContext<
  EducationFormContextType | undefined
>(undefined);

export const useEducationForm = () => {
  const context = useContext(EducationFormContext);
  if (!context) {
    throw new Error(
      "useEducationForm must be used within an EducationFormProvider"
    );
  }
  return context;
};

export const EducationFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [educations, setEducations] = useState<Education[]>(() => {
    const storedEducations = localStorage.getItem("educations");
    return storedEducations ? JSON.parse(storedEducations) : [];
  });
  const [currentEducation, setCurrentEducation] = useState<number | null>(null);

  const addEducation = (education: Education) => {
    let updatedEducations;
    if (currentEducation !== null) {
      // Editing an existing education
      updatedEducations = educations.map((edu, index) =>
        index === currentEducation ? education : edu
      );
    } else {
      // Adding a new education
      updatedEducations = [...educations, education];
    }
    setEducations(updatedEducations);
    localStorage.setItem("educations", JSON.stringify(updatedEducations));
  };

  const editEducation = (candidateId: number | undefined, index: number) => {
    setCurrentEducation(index);
  };

  return (
    <EducationFormContext.Provider
      value={{
        educations,
        addEducation,
        editEducation,
        currentEducation,
      }}
    >
      {children}
    </EducationFormContext.Provider>
  );
};
