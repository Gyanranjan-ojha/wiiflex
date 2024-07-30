import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl, personalInfoSchema, useOutsideClick } from "../../lib/utils";
import { usePersonalInfoForm } from "../../context/PersonalInfoProvider";
import ModalWrapper from "../ModalWrapper";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUserDetails } from "../../context/UserContextProvider";

const PersonalInfoForm = ({ onClose, onNext, mode = "step" }) => {
  const { addPersonalInfo, personalInfos, currentPersonalInfo } =
    usePersonalInfoForm();
  const { id: candidateIdFromPath } = useParams();
  const { fetchCandidateData } = useUserDetails();

  const formRef = useRef(null);

  const defaultValues = useMemo(
    () => (personalInfos !== null ? personalInfos : {}),
    [personalInfos]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [currentPersonalInfo, defaultValues, reset]);

  const formValues = watch();

  useEffect(() => {
    localStorage.setItem(
      "candidate_personal_info_data",
      JSON.stringify(formValues)
    );
  }, [formValues]);

  const onSubmit = async (data) => {
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";
    const candidateId =
      candidateIdFromPath || localStorage.getItem("candidateId");
    // onClose();
    addPersonalInfo(data);
    let body = {
      candidate_email: data.email,
      candidate_name: data.name,
      candidate_current_designation: data.positions,
      candidate_current_organization: data.organization,
      candidate_city_state: data.location,
      candidate_phone: data.phone,
      candidate_languages: data.languages, // Send it in the array format as backend is ready to handle it.
      candidate_country: data.country,
      candidate_pincode: data.pincode,
      email: adminEmail,
    };

    // Remove adminEmail from body if it's an edit operation
    if (mode === "edit") {
      body.candidate_id = candidateId;
    }

    // Determine the HTTP method based on the mode
    const apiMethod = mode === "edit" ? axios.put : axios.post;
    const apiUrl =
      mode === "edit"
        ? `${baseUrl}/candidates/update_candidate/`
        : `${baseUrl}/candidates/create_candidate/`;

    try {
      const response = await apiMethod(apiUrl, body);
      if (response.status === 201 || response.status === 200) {
        const candidateId = response.data?.candidate_id;
        console.log("hereh response.data:", response.data);
        localStorage.setItem("candidateId", candidateId);
        localStorage.setItem(
          "designation",
          response.data?.data.candidate_current_designation
        );

        // alert("Profile updated successfully!");
        if (mode === "step" && onNext) {
          onNext();
        } else {
          onClose();
          fetchCandidateData(candidateId); // Trigger re-fetch of candidate data
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

  const content = (
    <div
      className={`bg-color-white p-6 ${mode === "step" ? "w-1/2" : "w-full"}`}
    >
      <p className="text-left text-2xl p-3 pl-2 font-semibold">
        Personal Information
      </p>
      <div
        ref={formRef}
        className="bg-color-white max-w-2xl w-full flex flex-col"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-auto p-2"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-neutrals-100">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="positions" className="text-neutrals-100">
              Current Designation
            </label>
            <input
              id="positions"
              {...register("positions")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.positions && (
              <span className="text-red-500">{errors.positions?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="organization" className="text-neutrals-100">
              Organization
            </label>
            <input
              id="organization"
              {...register("organization")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.organization && (
              <span className="text-red-500">
                {errors.organization?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-neutrals-100 rounded-md">
              City, State
            </label>
            <input
              id="location"
              {...register("location")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.location && (
              <span className="text-red-500">{errors.location?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="text-neutrals-100">
              Country
            </label>
            <input
              id="country"
              {...register("country")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.country && (
              <span className="text-red-500">{errors.country?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pincode" className="text-neutrals-100">
              Pincode
            </label>
            <input
              id="pincode"
              {...register("pincode")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.pincode && (
              <span className="text-red-500">{errors.pincode?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-neutrals-100">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-neutrals-100">
              Phone Number
            </label>
            <input
              id="phone"
              {...register("phone")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone?.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="languages" className="text-neutrals-100">
              Languages
            </label>
            <input
              id="languages"
              {...register("languages")}
              className="border p-2 rounded-md focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.languages && (
              <span className="text-red-500">{errors.languages?.message}</span>
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
              onClick={onClose}
              className="p-2 bg-white-A700 border border-light_blue-700 text-light_blue-700 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              {mode === "edit" ? "Close" : "Previous"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return mode === "edit" ? <ModalWrapper>{content}</ModalWrapper> : content;
};

export default PersonalInfoForm;
