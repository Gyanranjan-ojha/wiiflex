import { useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl, experienceSchema, useOutsideClick } from "../../lib/utils";
import { useProfileForm } from "../../context/ProfileFormProvider";
import ModalWrapper from "../ModalWrapper";
import axios from "axios";
import Select from "react-select";
import { useUserDetails } from "../../context/UserContextProvider";

const jobTypeOptions = [
  { label: "Full Time", value: "Full Time" },
  { label: "Part Time", value: "Part Time" },
  { label: "Consultant", value: "Consultant" },
  { label: "Internship", value: "Internship" },
];

const ExperienceForm = ({
  onClose,
  onNext,
  onPrevious,
  mode = "step",
  experienceData,
}) => {
  const { addExperience, experiences, currentExperience } = useProfileForm();
  const { fetchCandidateData } = useUserDetails();
  const formRef = useRef();

  //TODO: Need to change it later once fetch candidate data from API.
  const jobTitle = localStorage.getItem("designation") || "";

  const defaultValues = useMemo(() => {
    if ((mode === "step" || mode === "edit") && jobTitle) {
      if (currentExperience !== null && experienceData) {
        const experience = experienceData.find(
          (exp) => exp.id === currentExperience
        );
        return experience || { designation: jobTitle }; // Set default job title here
      }
      return { designation: jobTitle }; // Set default job title here
    }
    return {};
  }, [currentExperience, experienceData, mode]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [currentExperience, defaultValues, reset]);

  // Watch all form fields to update local storage on change
  const formValues = watch();

  const onSubmit = async (data) => {
    // onClose();
    addExperience(data);

    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";
    const candidateId = localStorage.getItem("candidateId");

    const experienceObject = {
      id: currentExperience,
      designation: data.designation,
      company_name: data.company_name,
      work_type: data.work_type,
      joined_at: data.joined_at,
      resigned_at: data.resigned_at,
      is_currently_working: data.is_currently_working,
      work_desc: data.work_desc,
      work_address: data.work_address,
    };

    let body = {
      candidate_id: candidateId,
      email: adminEmail,
      candidate_experience_data: [experienceObject],
    };

    // Determine the HTTP method based on the mode
    const apiMethod = mode === "edit" ? axios.put : axios.post;
    const apiUrl =
      mode === "edit"
        ? `${baseUrl}/candidates/update_candidate/`
        : `${baseUrl}/candidates/create_candidate/`;
    try {
      const response = await apiMethod(apiUrl, body);

      if (response.status === 201 || response.status === 200) {
        // alert("Experience updated successfully!");
        if (mode === "step" && onNext) {
          onNext();
        } else {
          onClose();
          fetchCandidateData(response.data?.candidate_id);
        }
      } else {
        console.error("Registration failed with status:", response.status);
      }
    } catch (err) {
      alert(err.response?.data?.error);
    } finally {
      // setLoading(false);
    }
  };

  useOutsideClick(formRef, onClose);

  const isCurrentlyWorking = watch("is_currently_working");

  useEffect(() => {
    if (isCurrentlyWorking) {
      setValue("resigned_at", "");
    }
  }, [isCurrentlyWorking, setValue]);

  const content = (
    <div
      className={`bg-color-white p-6 ${mode === "step" ? "w-1/2" : "w-full"}`}
    >
      <p className="text-left text-2xl p-3 font-semibold">Experience details</p>
      <div
        ref={formRef}
        className="bg-white-A700 max-w-2xl w-full flex flex-col"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-auto p-3"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="designation" className="text-neutrals-100">
              Job Title
            </label>
            <input
              id="designation"
              {...register("designation")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.designation && (
              <span className="text-red-500">{errors.designation.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="company_name" className="text-neutrals-100">
              Company Name
            </label>
            <input
              id="company_name"
              {...register("company_name")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.company_name && (
              <span className="text-red-500">
                {errors.company_name.message}
              </span>
            )}
          </div>
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="work_type" className="text-neutrals-100">
              Job Type
            </label>
            <input
              id="work_type"
              {...register("work_type")}
              className="border p-2 rounded-md"
            />
            {errors.work_type && (
              <span className="text-red-500">{errors.work_type.message}</span>
            )}
          </div> */}
          <div className="flex flex-col gap-2">
            <label htmlFor="work_type" className="text-neutrals-100">
              Job Type
            </label>
            <Controller
              name="work_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={jobTypeOptions}
                  classNamePrefix="react-select"
                  className="react-select-container"
                  onChange={(selectedOption) => {
                    setValue("work_type", selectedOption.value);
                  }}
                  value={jobTypeOptions.find(
                    (option) => option.value === field.value
                  )}
                />
              )}
            />
            {errors.work_type && (
              <span className="text-red-500">{errors.study_type?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="joined_at" className="text-neutrals-100">
              Start date
            </label>
            <input
              id="joined_at"
              {...register("joined_at")}
              className="!border !p-2 w-1/3 !rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
              type="date"
            />
            {errors.joined_at && (
              <span className="text-red-500">{errors.joined_at.message}</span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <input
              id="is_currently_working"
              className="rounded-sm focus:border-[1px] focus:border-solid focus:border-light_blue-700"
              type="checkbox"
              {...register("is_currently_working")}
            />
            <label htmlFor="is_currently_working" className="text-neutrals-100">
              Currently work here
            </label>
            {errors.is_currently_working && (
              <span className="text-red-500">
                {errors.is_currently_working.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="resigned_at" className="text-neutrals-100">
              End date
            </label>
            <input
              id="resigned_at"
              {...register("resigned_at")}
              className="!border !p-2 w-1/3 !rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
              type="date"
              disabled={isCurrentlyWorking}
            />
            {errors.resigned_at && (
              <span className="text-red-500">{errors.resigned_at.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="work_address" className="text-neutrals-100">
              Job location
            </label>
            <input
              id="work_address"
              {...register("work_address")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.work_address && (
              <span className="text-red-500">
                {errors.work_address.message}
              </span>
            )}
          </div>
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="country" className="text-neutrals-100">
              Country
            </label>
            <input
              id="country"
              {...register("country")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </div> */}
          <div className="flex flex-col gap-2">
            <label htmlFor="work_desc" className="text-neutrals-100">
              Description
            </label>
            <textarea
              id="work_desc"
              {...register("work_desc")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.work_desc && (
              <span className="text-red-500">{errors.work_desc.message}</span>
            )}
          </div>
          <div className="flex justify-start gap-4">
            <button
              type="submit"
              className="p-2 bg-light_blue-700 text-color-white rounded-xl transition-transform duration-300 hover:scale-105"
            >
              {mode === "edit" ? "Submit" : "Continue"}
            </button>
            <button
              type="button"
              onClick={onPrevious}
              className="p-2 bg-white-A700 border border-light_blue-700 text-light_blue-700 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              {mode === "edit" ? "Close" : "Previous"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return mode === "edit" || mode === "add-on" ? (
    <ModalWrapper>{content}</ModalWrapper>
  ) : (
    content
  );
};

export default ExperienceForm;
