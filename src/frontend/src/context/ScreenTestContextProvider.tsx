import React, { createContext, useContext, useState } from "react";
import { ScreenTestData, ScreenTestDataSchema } from "../lib/utils";

interface ScreenTestContextType {
  screenTestData: ScreenTestData;
  updateScreenTestData: (data: ScreenTestData) => void;
  validateScreenTest: () => boolean;
}

const ScreenTestContext = createContext<ScreenTestContextType | undefined>(
  undefined
);

export const useScreenTestContext = (): ScreenTestContextType => {
  const context = useContext(ScreenTestContext);
  if (!context)
    throw new Error(
      "useScreenTestContext must be used within a ScreenTestContextProvider"
    );
  return context;
};

export const ScreenTestContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [screenTestData, setScreenTestData] = useState<ScreenTestData>({
    job_id: 0,
    screening_test_name: "",
    questions: [],
  });

  const updateScreenTestData = (data: ScreenTestData) =>
    setScreenTestData(data);

  const validateScreenTest = (): boolean => {
    try {
      console.log("screenTestData:", screenTestData);
      ScreenTestDataSchema.parse(screenTestData);
      return true; // Returns true if validation is successful
    } catch (error) {
      console.error("Validation error in screen test data", error);
      return false; // Returns false if there is a validation error
    }
  };

  return (
    <ScreenTestContext.Provider
      value={{ screenTestData, updateScreenTestData, validateScreenTest }}
    >
      {children}
    </ScreenTestContext.Provider>
  );
};
