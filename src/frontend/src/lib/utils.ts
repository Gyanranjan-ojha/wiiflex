// src/schemas.ts
import { string, z } from "zod";
import { FormData } from "../types";
import { useFormContext } from "../context/FormContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, RefObject } from "react";

const touchedFields: { [key: string]: boolean } = {
  // Example initial state, this should be dynamically managed in your application
  companyName: false,
  companySize: false,
  yourName: false,
  // Add other fields as necessary
};

const isFutureDate = (date: string) => new Date(date) > new Date();
const isDateOrderValid = (start: string, end: string) =>
  new Date(start) <= new Date(end);

// ________________

export const signInSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignIn = z.infer<typeof signInSchema>;

// ________________
const canValidate = (
  value: string | number | boolean,
  fieldName: string
): boolean => {
  // Check if the field has been touched and if the value is non-empty
  if (!touchedFields[fieldName]) {
    return false;
  }
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "boolean") {
    return true;
  }
  return false;
};

export const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  companyName: z
    .string()
    .min(10, { message: "Company name is required" })
    .refine((val) => canValidate(val, "companyName")),
  companySize: z
    .number()
    .min(1, { message: "Company size is required" })
    .refine((val) => canValidate(val, "companySize")),
  yourName: z
    .string()
    .min(1, { message: "Your name is required" })
    .refine((val) => canValidate(val, "yourName")),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((val) => canValidate(val, "phone")),
  companyCity: z
    .string()
    .min(1, { message: "City is required" })
    .refine((val) => canValidate(val, "companyCity")),
  companyState: z
    .string()
    .min(1, { message: "State is required" })
    .refine((val) => canValidate(val, "companyState")),
  companyCountry: z
    .string()
    .min(1, { message: "Country is required" })
    .refine((val) => canValidate(val, "companyCountry")),
  companyStreetAddress: z
    .string()
    .min(1, { message: "Street address is required" })
    .refine((val) => canValidate(val, "companyStreetAddress")),
  jobCity: z
    .string()
    .min(1, { message: "Job city is required" })
    .refine((val) => canValidate(val, "jobCity")),
  jobState: z
    .string()
    .min(1, { message: "Job state is required" })
    .refine((val) => canValidate(val, "jobState")),
  jobCountry: z
    .string()
    .min(1, { message: "Job country is required" })
    .refine((val) => canValidate(val, "jobCountry")),
  jobStreetAddress: z
    .string()
    .min(1, { message: "Job street address is required" })
    .refine((val) => canValidate(val, "jobStreetAddress")),
  jobTitle: z
    .string()
    .min(1, { message: "Job title is required" })
    .refine((val) => canValidate(val, "jobTitle")),
  jobType: z
    .string()
    .min(1, { message: "Job type is required" })
    .refine((val) => canValidate(val, "jobType")),
  experienceRequired: z
    .string()
    .min(1, { message: "Experience requirement is required" })
    .refine((val) => canValidate(val, "experienceRequired")),
  salaryRangeFrom: z
    .string()
    .min(1, { message: "Minimum salary is required" })
    .refine((val) => canValidate(val, "salaryRangeFrom")),
  salaryRangeTo: z
    .string()
    .min(1, { message: "Maximum salary is required" })
    .refine((val) => canValidate(val, "salaryRangeTo")),
  contractType: z
    .string()
    .min(1, { message: "Contract type is required" })
    .refine((val) => canValidate(val, "contractType")),
  additionalCompensation: z.array(z.string()),
  benefits: z.array(z.string()),
  hiresRequired: z
    .string()
    .min(1, { message: "Number of hires is required" })
    .refine((val) => canValidate(val, "hiresRequired")),
  urgency: z
    .string()
    .min(1, { message: "Urgency is required" })
    .refine((val) => canValidate(val, "urgency")),
  availability: z.array(z.string()),
  companyWebsite: z
    .string()
    .min(1, { message: "Company website is required" })
    .refine((val) => canValidate(val, "companyWebsite")),
  isHireFullyRemote: z
    .boolean()
    .refine((val) => canValidate(val, "isHireFullyRemote"), {
      message: "Please make a decision regarding remote hiring",
    }),
  jobDescription: z
    .string()
    .min(1, { message: "Job description is required" })
    .refine((val) => canValidate(val, "jobDescription")),
  // interviewOptions: z.object({
  //   videoInterview: z.boolean(),
  //   videoCalling: z.boolean(),
  //   email: z.boolean(),
  // }),
});

export type FormDataValidated = z.infer<typeof formSchema>;

// ________________

// Define the schema for a single question.
export const ScreenTestQuestionSchema = z.object({
  questionType: z.enum(["written", "mcq"]),
  question: z.string().min(1, { message: "Question text is required" }),
  options: z
    .array(z.string())
    .optional()
    .refine((options) => (options ? options.length === 4 : true), {
      message: "MCQs must have exactly four options if provided.",
    }),
  correctAnswer: z.number().nonnegative().optional(),
});

// Use superRefine for validations that depend on multiple fields.
export const ScreenTestDataSchema = z.object({
  job_id: z.number().min(1, { message: "Job ID is required" }),
  screening_test_name: z
    .string()
    .min(1, { message: "Screening test name is required" }),
  questions: z.array(ScreenTestQuestionSchema).superRefine((questions) => {
    questions.forEach((question) => {
      if (
        question.questionType === "mcq" &&
        question.options &&
        question.correctAnswer !== undefined
      ) {
        if (question.correctAnswer >= question.options.length) {
          throw new Error(
            "Correct answer index must be within the range of the provided options for MCQs."
          );
        }
      }
    });
  }),
});

export type ScreenTestData = z.infer<typeof ScreenTestDataSchema>;

// ________________

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  positions: z.string().min(1, "Position is required"),
  organization: z.string().min(1, "Organization is required"),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  languages: z.string().min(1, "Languages are required"),
  country: z.string().min(2, "Country is required"),
  pincode: z.string().min(2, "Pincode is required"),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

//_________________

export const experienceSchema = z
  .object({
    designation: z.string().min(1, "Designation is required"),
    company_name: z.string().min(1, "Company name is required"),
    work_type: z.string().min(1, "Work type is required"),
    joined_at: z.string().refine((date) => !isFutureDate(date), {
      message: "Start date cannot be in the future",
    }),
    resigned_at: z
      .string()
      .nullable()
      .refine((date) => date === null || !isFutureDate(date), {
        message: "End date cannot be in the future",
      }),
    is_currently_working: z.boolean(),
    work_desc: z.string().min(1, "Work description is required"),
    work_address: z.string().min(1, "Work address is required"),
  })
  .refine(
    (data) =>
      data.is_currently_working ||
      isDateOrderValid(data.joined_at, data.resigned_at!),
    {
      message: "Start date cannot be after end date",
      path: ["resigned_at"],
    }
  );

export type Experience = z.infer<typeof experienceSchema>;

export const profileFormSchema = z.object({
  experiences: z.array(experienceSchema),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;

// ________________

export const educationSchema = z
  .object({
    degree: z.string().min(1, "Degree is required"),
    degree_specialization: z
      .string()
      .min(1, "Degree specialization is required"),
    university_name: z.string().min(2, "University name is required"),
    started_at: z.string().refine((date) => !isFutureDate(date), {
      message: "Start date cannot be in the future",
    }),
    is_pursuing: z.boolean(),
    end_at: z
      .string()
      .nullable()
      .refine((date) => date === null || !isFutureDate(date), {
        message: "End date cannot be in the future",
      }),
    study_desc: z.string().min(1, "Study description is required"),
    study_address: z.string().min(1, "Study address is required"),
    study_type: z.string().min(1, "Study type is required"),
    percentage_cgpa: z.string().min(1, "Percentage / CGPA is required"),
  })
  .refine(
    (data) =>
      data.is_pursuing || isDateOrderValid(data.started_at, data.end_at!),
    {
      message: "Start date cannot be after end date",
      path: ["end_at"],
    }
  );

export type Education = z.infer<typeof educationSchema>;

export const profileEducationSchema = z.object({
  educations: z.array(educationSchema),
});

export type ProfileEducationSchema = z.infer<typeof profileEducationSchema>;

// ________________

export const aboutMeSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export type AboutMe = z.infer<typeof aboutMeSchema>;

// ________________

export const skillSchema = z.object({
  skill: z.string().min(1, "Skill is required"),
});

export type Skill = z.infer<typeof skillSchema>;

// ________________

export const portfolioSchema = z.object({
  url: z.string().url("Invalid URL").min(1, "URL is required"),
});

export type Portfolio = z.infer<typeof portfolioSchema>;

// ________________

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const YOUR_API_KEY = import.meta.env.VITE_APP_THUMBNAIL_API_KEY;

export const useGoTo = () => {
  const navigate = useNavigate();

  return (path: string) => {
    navigate(path);
  };
};

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  setIsOpen: (isOpen: boolean) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setIsOpen]);
};
