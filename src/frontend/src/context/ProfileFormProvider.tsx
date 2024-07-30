import React, { createContext, useContext, useState } from "react";
import { Experience } from "../lib/utils";

type ProfileFormContextType = {
  experiences: Experience[];
  addExperience: (experience: Experience) => void;
  editExperience: (candidateId: number | undefined, index: number) => void;
  currentExperience: number | null;
};

const ProfileFormContext = createContext<ProfileFormContextType | undefined>(
  undefined
);

export const useProfileForm = () => {
  const context = useContext(ProfileFormContext);
  if (!context) {
    throw new Error("useProfileForm must be used within a ProfileFormProvider");
  }
  return context;
};

export const ProfileFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const storedExperiences = localStorage.getItem("experiences");
    return storedExperiences ? JSON.parse(storedExperiences) : [];
  });

  const [currentExperience, setCurrentExperience] = useState<number | null>(
    null
  );

  const addExperience = (experience: Experience) => {
    let updatedExperiences;
    if (currentExperience !== null) {
      // Editing an existing experience
      updatedExperiences = experiences.map((exp, index) =>
        index === currentExperience ? experience : exp
      );
    } else {
      // Adding a new experience
      updatedExperiences = [...experiences, experience];
    }
    setExperiences(updatedExperiences);
    localStorage.setItem("experiences", JSON.stringify(updatedExperiences));
  };

  const editExperience = (candidateId: number | undefined, index: number) => {
    setCurrentExperience(index);
  };

  return (
    <ProfileFormContext.Provider
      value={{
        experiences,
        addExperience,
        editExperience,
        currentExperience,
      }}
    >
      {children}
    </ProfileFormContext.Provider>
  );
};
