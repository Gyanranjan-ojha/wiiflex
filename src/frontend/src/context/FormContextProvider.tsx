import React, { ReactNode, createContext, useContext, useState } from "react";
import { formSchema, FormDataValidated } from "../lib/utils";
import { z } from "zod";

// const FormContext = createContext();
interface FormContextType {
  formData: FormDataValidated;
  updateFormData: (field: keyof FormDataValidated, value: any) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateForm: () => boolean;
  touchedFields: { [key: string]: boolean };
  setFieldTouched: (field: string) => void;
  sharedInputValue: string;
}

const FormContext = createContext<FormContextType | undefined>(undefined);
// export const useFormContext = () => useContext(FormContext);
export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) throw new Error("FormContext not found");
  return context;
};

interface FormContextProviderProps {
  children: React.ReactNode;
}

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  // Using a function to initialize state to ensure formSchema.parse only runs once on component mount
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});

  const [formData, setFormData] = useState<FormDataValidated>({
    email: localStorage.getItem("email") || "gyan@gmail.com",
    //first page
    companyName: "",
    companySize: 0,
    yourName: "",
    phone: "",
    companyCity: "",
    companyState: "",
    companyCountry: "",
    companyStreetAddress: "",
    jobCity: "",
    jobState: "",
    jobCountry: "",
    jobStreetAddress: "",
    //second page
    jobTitle: "",
    jobType: "",
    experienceRequired: "",
    salaryRangeFrom: "",
    salaryRangeTo: "",
    contractType: "",
    additionalCompensation: [],
    benefits: [],
    //third page
    hiresRequired: "",
    urgency: "",
    availability: [],
    companyWebsite: "",
    isHireFullyRemote: false,
    //third page
    jobDescription: "",
    // interviewOptions: {
    //   videoInterview: false,
    //   videoCalling: false,
    //   email: false,
    // },
  });
  const [sharedInputValue, setSharedInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSharedInputValue(e.target.value);
  };

  // console.log("formData:", formData); //TODO: remove later

  const updateFormData = (field: keyof FormDataValidated, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldTouched(field.toString());
  };
  // const updateScreenTest = (field: keyof FormDataValidated, value: any) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  //   setFieldTouched(field.toString());
  // };

  const setFieldTouched = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = (): boolean => {
    try {
      // This will throw an error if validation fails
      formSchema.parse(formData);
      return true; // If parsing succeeds, return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        // ZodError is the type of error thrown by Zod when validation fails
        console.error("Validation failed", error.format());
      }
      return false; // Return false if parsing fails
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        validateForm,
        touchedFields,
        setFieldTouched,
        sharedInputValue,
        handleInputChange,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
