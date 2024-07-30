import React, { createContext, useContext, useState, ReactNode } from "react";
import { PersonalInfo } from "../lib/utils";

type PersonalInfoFormContextType = {
  personalInfos: PersonalInfo;
  addPersonalInfo: (info: PersonalInfo) => void;
  editPersonalInfo: (index: number) => void;
  deletePersonalInfo: (index: number) => void;
  currentPersonalInfo: number | null;
};

const PersonalInfoFormContext = createContext<
  PersonalInfoFormContextType | undefined
>(undefined);

export const usePersonalInfoForm = () => {
  const context = useContext(PersonalInfoFormContext);
  if (!context) {
    throw new Error(
      "usePersonalInfoForm must be used within a PersonalInfoFormProvider"
    );
  }
  return context;
};

export const PersonalInfoFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [personalInfos, setPersonalInfos] = useState<PersonalInfo>(() => {
    const storedPersonalInfos = localStorage.getItem("personalInfos");
    return storedPersonalInfos ? JSON.parse(storedPersonalInfos) : {};
  });
  const [currentPersonalInfo, setCurrentPersonalInfo] = useState<number | null>(
    null
  );

  const addPersonalInfo = (info: PersonalInfo) => {
    setPersonalInfos(info);
    localStorage.setItem("personalInfos", JSON.stringify(info));
  };

  const editPersonalInfo = (index: number) => {
    setCurrentPersonalInfo(index);
  };

  const deletePersonalInfo = (index: number) => {
    // const updatedPersonalInfos = personalInfos.filter((_, i) => i !== index);
    // setPersonalInfos(updatedPersonalInfos);
    // localStorage.setItem("personalInfos", JSON.stringify(updatedPersonalInfos));
  };

  return (
    <PersonalInfoFormContext.Provider
      value={{
        personalInfos,
        addPersonalInfo,
        editPersonalInfo,
        deletePersonalInfo,
        currentPersonalInfo,
      }}
    >
      {children}
    </PersonalInfoFormContext.Provider>
  );
};
