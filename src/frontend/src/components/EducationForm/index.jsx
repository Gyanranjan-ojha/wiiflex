// EducationForm.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl, educationSchema, useOutsideClick } from "../../lib/utils";
import { useEducationForm } from "../../context/EducationsProvider";
import ModalWrapper from "../ModalWrapper";
import axios from "axios";
import { SelectBox } from "../SelectBox";
import Select from "react-select";
import { useUserDetails } from "../../context/UserContextProvider";

const courseTypeOptions = [
  { label: "Full Time", value: "Full Time" },
  { label: "Part Time", value: "Part Time" },
  { label: "Correspondance/ Distance", value: "Correspondance/ Distance" },
];

const EducationForm = ({
  onClose,
  onNext,
  onPrevious,
  mode = "step",
  educationsData,
}) => {
  const { addEducation, educations, currentEducation } = useEducationForm();
  const formRef = useRef(null);
  const { fetchCandidateData } = useUserDetails();

  const defaultValues = useMemo(() => {
    if (currentEducation !== null && educationsData) {
      const experience = educationsData.find(
        (exp) => exp.id === currentEducation
      );
      return experience || {};
    }
    return {};
  }, [currentEducation, educationsData]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [currentEducation, defaultValues, reset]);

  const formValues = watch();

  useEffect(() => {
    localStorage.setItem(
      "candidate_education_data",
      JSON.stringify(formValues)
    );
  }, [formValues]);

  const onSubmit = async (data) => {
    console.log("onsubmit education data:", data);
    addEducation(data);

    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";
    const candidateId = localStorage.getItem("candidateId");

    const educationObject = {
      id: currentEducation,
      university_name: data.university_name,
      degree: data.degree,
      degree_specialization: data.degree_specialization,
      started_at: data.started_at,
      is_pursuing: data.is_pursuing,
      end_at: data.end_at,
      study_desc: data.study_desc,
      study_address: data.study_address,
      study_type: data.study_type,
      percentage_cgpa: data.percentage_cgpa,
    };

    let body = {
      candidate_id: candidateId,
      email: adminEmail,
      candidate_education_data: [educationObject],
    };

    const apiMethod = mode === "edit" ? axios.put : axios.post;
    const apiUrl =
      mode === "edit"
        ? `${baseUrl}/candidates/update_candidate/`
        : `${baseUrl}/candidates/create_candidate/`;
    try {
      const response = await apiMethod(apiUrl, body);

      console.log("response.status:", response.status);
      if (response.status === 200 || response.status === 201) {
        // alert("Education updated successfully!");
        // goTo(`/all-candidates/${jobId}`);
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

  const isPursuing = watch("is_pursuing");

  // Effect to handle changes in the "Currently Pursuing" checkbox state
  useEffect(() => {
    if (isPursuing) {
      setValue("end_at", "");
    }
  }, [isPursuing, setValue]);

  const content = (
    <div
      className={`bg-color-white p-6 ${mode === "step" ? "w-1/2" : "w-full"}`}
    >
      <p className="text-left text-2xl p-3 font-semibold">Education Details</p>
      <div
        ref={formRef}
        className="bg-white-A700 p-3 max-w-2xl w-full  flex flex-col"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="degree" className="text-neutrals-100">
              Degree
            </label>
            <input
              id="degree"
              {...register("degree")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-light_blue-700"
            />
            {errors.degree && (
              <span className="text-red-500">{errors.degree?.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="degree_specialization"
              className="text-neutrals-100"
            >
              Degree Specialization
            </label>
            <input
              id="degree_specialization"
              {...register("degree_specialization")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-light_blue-700"
            />
            {errors.degree_specialization && (
              <span className="text-red-500">
                {errors.degree_specialization?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="university_name" className="text-neutrals-100">
              University / College name
            </label>
            <input
              id="university_name"
              {...register("university_name")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-light_blue-700"
            />
            {errors.university_name && (
              <span className="text-red-500">
                {errors.university_name?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="started_at" className="text-neutrals-100">
              Started At
            </label>
            <input
              id="started_at"
              {...register("started_at")}
              className="!border !p-2 w-1/3 !rounded-lg focus:border-[1px] focus:border-light_blue-700"
              type="date"
            />
            {errors.started_at && (
              <span className="text-red-500">{errors.started_at?.message}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              id="is_pursuing"
              type="checkbox"
              {...register("is_pursuing")}
              className="rounded-sm focus:border-[1px] focus:border-light_blue-700"
            />
            <label htmlFor="is_pursuing" className="text-neutrals-100">
              Currently Pursuing
            </label>
            {errors.is_pursuing && (
              <span className="text-red-500">
                {errors.is_pursuing?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="end_at" className="text-neutrals-100">
              End At
            </label>
            <input
              id="end_at"
              {...register("end_at")}
              className="!border !p-2 w-1/3 !rounded-md focus:border-[1px] focus:border-light_blue-700"
              type="date"
              disabled={isPursuing}
            />
            {errors.end_at && (
              <span className="text-red-500">{errors.end_at?.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="study_desc" className="text-neutrals-100">
              Academic achievements / Awards
            </label>
            <textarea
              id="study_desc"
              {...register("study_desc")}
              className="border p-2 rounded-md focus:border-2 focus:border-light_blue-700"
            />
            {errors.study_desc && (
              <span className="text-red-500">{errors.study_desc?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="study_address" className="text-neutrals-100">
              University / College location
            </label>
            <input
              id="study_address"
              {...register("study_address")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-light_blue-700"
            />
            {errors.study_address && (
              <span className="text-red-500">
                {errors.study_address?.message}
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
              className="border p-2 rounded-md focus:outline-none focus:border-light_blue-700"
            />
            {errors.country && (
              <span className="text-red-500">{errors.country?.message}</span>
            )}
          </div> */}
          <div className="flex flex-col gap-2">
            <label htmlFor="study_type" className="text-neutrals-100">
              Course Type
            </label>
            <Controller
              name="study_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={courseTypeOptions}
                  classNamePrefix="react-select"
                  className="react-select-container focus:outline-none focus:border-light_blue-700"
                  onChange={(selectedOption) => {
                    setValue("study_type", selectedOption.value);
                  }}
                  value={courseTypeOptions.find(
                    (option) => option.value === field.value
                  )}
                />
              )}
            />
            {errors.study_type && (
              <span className="text-red-500">{errors.study_type?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="percentage_cgpa" className="text-neutrals-100">
              Percentage / CGPA
            </label>
            <input
              id="percentage_cgpa"
              {...register("percentage_cgpa")}
              className="border p-2 rounded-md focus:outline-none focus:border-light_blue-700"
            />
            {errors.percentage_cgpa && (
              <span className="text-red-500">
                {errors.percentage_cgpa?.message}
              </span>
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
              // onClick={onClose}
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

export default EducationForm;
