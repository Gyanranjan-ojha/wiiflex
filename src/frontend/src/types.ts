export interface InterviewOptions {
  videoInterview: boolean;
  videoCalling: boolean;
  email: boolean;
}

export interface FormData {
  email: string;
  companyName: string;
  companySize: number;
  yourName: string;
  phone: string;
  companyCity: string;
  companyState: string;
  companyCountry: string;
  companyStreetAddress: string;
  jobCity: string;
  jobState: string;
  jobCountry: string;
  jobStreetAddress: string;
  jobTitle: string;
  jobType: string;
  experienceRequired: string;
  salaryRangeFrom: string;
  salaryRangeTo: string;
  contractType: string;
  additionalCompensation: string[];
  benefits: string[];
  hiresRequired: string;
  urgency: string;
  availability: string[];
  companyWebsite: string;
  isHireFullyRemote: boolean;
  jobDescription: string;
  interviewOptions: InterviewOptions;
}
