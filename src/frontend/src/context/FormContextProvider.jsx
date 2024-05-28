import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") || "gyan@gmail.com",
    //first page
    companyName: "",
    companySize: "",
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
    salaryRange: { from: "", to: "" },
    additionalCompensation: [],
    benefits: [],
    hiresRequired: "",
    urgency: "",
    availability: [],
    jobDescription: "",
    interviewOptions: {
      videoInterview: false,
      videoCalling: false,
      email: false,
    },
  });
  console.log("formData:", formData);

  const updateFormData = (field, value) => {
    // console.log("field, value:", field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
