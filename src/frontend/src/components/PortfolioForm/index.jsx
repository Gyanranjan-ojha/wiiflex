// PortfolioForm.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl, portfolioSchema, useGoTo } from "../../lib/utils";
import { usePortfolio } from "../../context/PortfolioProvider";
import ModalWrapper from "../ModalWrapper";
import { useOutsideClick } from "../../lib/utils";
import axios from "axios";
import { useUserDetails } from "../../context/UserContextProvider";
import { useParams } from "react-router-dom";

const PortfolioForm = ({
  onClose,
  onNext,
  onPrevious,
  mode = "step",
  portfolioLink,
}) => {
  const { setPortfolio } = usePortfolio();
  const formRef = useRef(null);
  const goTo = useGoTo();
  const { fetchCandidateData } = useUserDetails();
  const params = useParams();
  let candidateId = params?.id;

  // Get candidateId from localStorage if it's undefined or null
  if (!candidateId) {
    candidateId = localStorage.getItem("candidateId");
  }

  const defaultValues = useMemo(() => {
    if (portfolioLink !== null && portfolioLink) {
      return { url: portfolioLink };
    }
    return { url: "" };
  }, [portfolioLink]);

  useOutsideClick(formRef, onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    setPortfolio(data);

    const { url } = data;
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";
    // const candidateId = localStorage.getItem("candidateId");

    let body = {
      candidate_portfolio: url,
      candidate_id: candidateId,
      email: adminEmail,
    };
    const apiMethod = mode === "edit" ? axios.put : axios.post;
    const apiUrl =
      mode === "edit"
        ? `${baseUrl}/candidates/update_candidate/`
        : `${baseUrl}/candidates/create_candidate/`;
    try {
      const response = await apiMethod(apiUrl, body);

      console.log("response.status:", response.status);
      if (response.status === 200) {
        const { candidate_id } = response.data;
        alert("Profile updated successfully!");
        if (mode === "step" && onNext) {
          goTo(`/dashboard-profile/${candidate_id}`);
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

    reset();
    // onClose();
  };

  const content = (
    <div
      className={`bg-color-white p-6 ${mode === "step" ? "w-1/2" : "w-full"}`}
    >
      <p className="text-left text-2xl p-3 font-semibold">Add Your Portfolio</p>
      <div
        ref={formRef}
        className="bg-white-A700 max-w-2xl w-full flex flex-col"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-auto p-3"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="text-neutrals-100">
              Portfolio URL
            </label>
            <input
              id="url"
              {...register("url")}
              className="border p-2 rounded-md"
              placeholder="https://example.com"
            />
            {errors.url && (
              <span className="text-red-500">{errors.url.message}</span>
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

export default PortfolioForm;
