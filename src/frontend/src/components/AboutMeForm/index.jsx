// AboutMeForm.tsx
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutMeSchema, baseUrl } from "../../lib/utils";
import { useAboutMe } from "../../context/AboutMeProvider";
import ModalWrapper from "../ModalWrapper";
import { useOutsideClick } from "../../lib/utils";
import axios from "axios";
import { useUserDetails } from "../../context/UserContextProvider";

const AboutMeForm = ({ onClose, onNext, onPrevious, mode = "step" }) => {
  const { addAboutMe, aboutMe } = useAboutMe();
  const { fetchCandidateData } = useUserDetails();

  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: aboutMe || { description: "" },
  });

  useEffect(() => {
    reset(aboutMe || { description: "" });
  }, [aboutMe, reset]);

  const onSubmit = async (data) => {
    addAboutMe(data);
    const { description } = data;
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";
    const candidateId = localStorage.getItem("candidateId");

    let body = {
      candidate_desc: description,
      candidate_id: candidateId,
      email: adminEmail,
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
        console.log("response.status:", response.status);
        const candidateId = response.data?.candidate_id;
        // alert("Your profile updated successfully!");
        // goTo(`/all-candidates/${jobId}`);
        if (mode === "step" && onNext) {
          onNext();
        } else {
          onClose();
          fetchCandidateData(candidateId);
        }
      } else {
        console.error("Registration failed with status:", response.status);
      }
    } catch (err) {
      alert(err.response?.data?.error);
    } finally {
      // setLoading(false);
    }

    // onClose();
  };
  useOutsideClick(formRef, onClose);
  const content = (
    <div
      className={`bg-color-white p-6 ${mode === "step" ? "w-1/2" : "w-full"}`}
    >
      <div
        ref={formRef}
        className="bg-white-A700 p-3 max-w-2xl w-full min-h-fit flex flex-col"
      >
        <p className="text-left text-2xl p-3 font-semibold">
          Write Something About You
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-auto p-3"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-neutrals-100">
              {/* Description */}
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="border p-2 rounded-xl focus:border-[1px] focus:border-solid focus:border-light_blue-700"
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
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
  return mode === "edit" ? <ModalWrapper>{content}</ModalWrapper> : content;
};

export default AboutMeForm;
