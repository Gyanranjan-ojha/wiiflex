// SkillsForm.tsx
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl, skillSchema } from "../../lib/utils";
import { useSkills } from "../../context/SkillsProvider";
import ModalWrapper from "../ModalWrapper";
import { useOutsideClick } from "../../lib/utils";
import axios from "axios";
import { Text } from "../Text";
import { useParams } from "react-router-dom";
import { useUserDetails } from "../../context/UserContextProvider";

const SkillsForm = ({
  onClose,
  onNext,
  onPrevious,
  mode = "step",
  skillsData,
}) => {
  console.log("skills form mode:", mode);
  const { suggestedSkills } = useSkills();
  const { candidateData, fetchCandidateData } = useUserDetails();
  const formRef = useRef(null);
  const params = useParams();
  const candidateId = params?.id || localStorage.getItem("candidateId");

  useOutsideClick(formRef, onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(skillSchema),
  });

  console.log("candidateData:", candidateData);
  console.log("skillsData:", skillsData);
  const postSkills = async (newSkill) => {
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";

    let body = {
      candidate_skills_data: [newSkill],
      candidate_id: candidateId,
      email: adminEmail,
    };
    //TODO: API CALL
    try {
      const response = await axios.post(
        `${baseUrl}/candidates/create_candidate/`,
        body
      );
      console.log("response.status:", response.status);
      if (response.status === 200 || response.status === 201) {
        // alert("Skills updated successfully!");
        // goTo(`/all-candidates/${jobId}`);
        return true;
      } else {
        console.error("Registration failed with status:", response.status);
        return false;
      }
    } catch (err) {
      alert(err.response?.data?.error);
      return false;
    } finally {
      // setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const newSkill = data.skill;
    const success = await postSkills(newSkill);
    if (candidateId && success) fetchCandidateData(candidateId);
    reset();
  };

  const handleNext = async () => {
    // const success = await postSkills();
    if (mode === "step" && onNext) {
      onNext();
    } else {
      onClose();
      if (candidateId && mode === "edit") fetchCandidateData(candidateId);
    }
  };
  const deleteSkill = async (candidateId, skillId) => {
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";

    let body = {
      skill_ids: [skillId],
      candidate_id: candidateId,
      email: adminEmail,
    };
    //TODO: API CALL
    try {
      const response = await axios.delete(
        `${baseUrl}/candidates/delete_candidate/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: body,
        }
      );
      console.log("response.status:", response.status);
      if (response.status === 200 || response.status === 201) {
        const candidateId = response.data?.candidate_id;
        console.log("skills candidateId:", candidateId);
        fetchCandidateData(candidateId);
        reset();
        return true;
      } else {
        console.error("Registration failed with status:", response.status);
        return false;
      }
    } catch (err) {
      alert(err.response?.data?.error);
      return false;
    } finally {
      // setLoading(false);
    }
  };

  const content = (
    <div
      className={`bg-color-white p-6 ${mode === "step" ? "w-1/2" : "w-full"}`}
    >
      <p className="text-left text-2xl p-3 font-semibold">Add Your Skills</p>
      <div
        ref={formRef}
        className="bg-white-A700 p-3 max-w-2xl w-full flex flex-col"
      >
        <div className="flex flex-wrap gap-2">
          {mode === "step" &&
            (skillsData || candidateData.skills_data)?.map((skill, index) => (
              <div
                key={index}
                className="bg-black-900 text-color-white rounded-full px-3 py-1 cursor-pointer"
                onClick={() => deleteSkill(candidateId, skill.id)}
              >
                {skill?.name}
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="skill" className="text-neutrals-100">
              {/* Skill */}
            </label>
            <input
              id="skill"
              {...register("skill")}
              className="border p-2 rounded-lg"
              placeholder="Skill (ex: Project Management)"
            />
            {errors.skill && (
              <span className="text-red-500">{errors.skill.message}</span>
            )}
          </div>
          <div className="flex justify-start gap-4">
            <button
              type="submit"
              className="p-2 bg-black-900 text-color-white rounded-xl transition-transform duration-300 hover:scale-105"
            >
              {mode === "edit" ? "Submit" : "Add Skill"}
            </button>
            <button
              type="button"
              onClick={mode === "step" ? onPrevious : onClose}
              className="p-2 bg-white-A700 border border-light_blue-700 text-light_blue-700 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              {mode === "step" ? "Previous" : "Close"}
            </button>
          </div>
        </form>
        <Text className="mt-4 mb-2 font-semibold">
          Suggested based on your profile
        </Text>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills?.map((skill, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-full px-3 py-1 cursor-pointer"
              onClick={() => onSubmit(skill)}
            >
              {skill.skill}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="mt-2 p-2 bg-light_blue-700 text-color-white rounded-xl transition-transform duration-300 hover:scale-105"
        >
          {mode === "step" ? "Next" : "Done"}
        </button>
      </div>
    </div>
  );

  return mode === "edit" ? <ModalWrapper>{content}</ModalWrapper> : content;
};

export default SkillsForm;
